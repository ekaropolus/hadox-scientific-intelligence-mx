'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Form } from 'react-bootstrap'
import { stateReports } from '@/modules/mx-states/reportConfig'

const STORAGE_KEY = 'mx-hadox-active-state'
const CHANGE_EVENT = 'mx-hadox-state-change'
const DEFAULT_ALLOWED_STATES = 'morelos,tlaxcala,queretaro'

const configuredAllowedStateIds = () =>
  (process.env.NEXT_PUBLIC_MX_ALLOWED_STATES || DEFAULT_ALLOWED_STATES)
    .split(',')
    .map((state) => state.trim().toLowerCase())
    .filter(Boolean)

export const getPermittedStateReports = () => {
  const allowedIds = configuredAllowedStateIds()
  const permitted = stateReports.filter((state) => allowedIds.includes(state.id))
  return permitted.length ? permitted : stateReports
}

const resolveState = (stateId, permittedStates) => permittedStates.find((state) => state.id === stateId) ?? permittedStates[0] ?? stateReports[0]

const readStoredState = (permittedStates) => {
  if (typeof window === 'undefined') return permittedStates[0] ?? stateReports[0]
  return resolveState(window.localStorage.getItem(STORAGE_KEY), permittedStates)
}

export const useMxStateSelection = () => {
  const permittedStates = useMemo(() => getPermittedStateReports(), [])
  const [selectedState, setSelectedStateValue] = useState(() => readStoredState(permittedStates))

  const setSelectedState = useCallback(
    (stateOrId) => {
      const next = resolveState(typeof stateOrId === 'string' ? stateOrId : stateOrId?.id, permittedStates)
      setSelectedStateValue(next)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, next.id)
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { stateId: next.id } }))
      }
    },
    [permittedStates],
  )

  useEffect(() => {
    const syncSelection = (event) => {
      const stateId = event?.detail?.stateId ?? window.localStorage.getItem(STORAGE_KEY)
      setSelectedStateValue(resolveState(stateId, permittedStates))
    }

    syncSelection()
    window.addEventListener(CHANGE_EVENT, syncSelection)
    window.addEventListener('storage', syncSelection)

    return () => {
      window.removeEventListener(CHANGE_EVENT, syncSelection)
      window.removeEventListener('storage', syncSelection)
    }
  }, [permittedStates])

  return { selectedState, permittedStates, setSelectedState }
}

export const MxGlobalStateSelector = ({ className = '' }) => {
  const { selectedState, permittedStates, setSelectedState } = useMxStateSelection()

  return (
    <div className={`mx-global-state-selector ${className}`}>
      <Form.Label className="visually-hidden" htmlFor="mx-global-state-selector">
        Active report state
      </Form.Label>
      <Form.Select
        id="mx-global-state-selector"
        size="sm"
        aria-label="Active report state"
        value={selectedState.id}
        onChange={(event) => setSelectedState(event.target.value)}
        style={{ minWidth: 132 }}
      >
        {permittedStates.map((state) => (
          <option value={state.id} key={state.id}>
            {state.title}
          </option>
        ))}
      </Form.Select>
    </div>
  )
}
