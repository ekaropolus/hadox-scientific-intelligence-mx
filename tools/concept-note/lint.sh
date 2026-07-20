#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)
PDF=${1:-docs/concept-note.pdf}
SOURCE=${2:-docs/concept-note.md}

case "$PDF" in
  /*) ;;
  *) PDF="$REPO_ROOT/$PDF" ;;
esac
case "$SOURCE" in
  /*) ;;
  *) SOURCE="$REPO_ROOT/$SOURCE" ;;
esac

for command_name in pdfinfo pdftotext; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    printf '%s\n' "error: required preflight command not found: $command_name" >&2
    exit 127
  fi
done

if [ ! -s "$PDF" ]; then
  printf '%s\n' "error: PDF is missing or empty: $PDF" >&2
  exit 2
fi
if [ ! -f "$SOURCE" ]; then
  printf '%s\n' "error: concept-note source is missing: $SOURCE" >&2
  exit 2
fi

require_source_pattern() {
  pattern=$1
  label=$2
  if ! grep -Eiq "$pattern" "$SOURCE"; then
    printf '%s\n' "error: source is missing required editorial element: $label" >&2
    exit 3
  fi
}

require_source_pattern 'hadox-research-labs-lockup\.png' 'Hadox lockup'
require_source_pattern '(Tesis|Thesis)' 'thesis'
require_source_pattern '(Cadena evidencia|Evidence-to-decision)' 'evidence-to-decision mechanism'
require_source_pattern '(Ledger de evidencia|Evidence and maturity)' 'evidence and maturity ledger'
require_source_pattern '(90 d[ií]as|90-day)' '90-day route'
require_source_pattern '(Contribuci[oó]n abierta|Open contribution)' 'open contribution route'
require_source_pattern '(Fuentes del concepto|Sources and repository)' 'sources and repository'
require_source_pattern 'github\.com/' 'canonical repository link'
require_source_pattern 'Apache(-| License )?2\.0' 'Apache-2.0 licence boundary'

if grep -EIn '(\]\([[:space:]]*\)|/home/|/mnt/[a-z]/|[A-Za-z]:\\|<[^>]+>|undefined|(^|[^[:alpha:]])NaN([^[:alpha:]]|$)|Ã|Â|�|(^|[^[:alnum:]_])(TODO|TBD|FIXME|Lorem ipsum)([^[:alnum:]_]|$))' "$SOURCE" >&2; then
  printf '%s\n' 'error: source contains a placeholder, local path, HTML, broken Unicode, or undefined value' >&2
  exit 3
fi

if grep -EIn '(BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}|(password|passwd|api[_-]?key|secret|token)[[:space:]]*[:=][[:space:]]*[^[:space:]]+)' "$SOURCE" >&2; then
  printf '%s\n' 'error: source contains text resembling a credential or private key' >&2
  exit 3
fi

INFO=$(pdfinfo "$PDF")
PAGES=$(printf '%s\n' "$INFO" | awk '/^Pages:/ {print $2; exit}')
PAGE_SIZE=$(printf '%s\n' "$INFO" | awk -F: '/^Page size:/ {sub(/^[[:space:]]+/, "", $2); print $2; exit}')

case "$PAGES" in
  ''|*[!0-9]*)
    printf '%s\n' "error: pdfinfo did not return a numeric page count" >&2
    exit 3
    ;;
esac
if [ "$PAGES" -ne 3 ]; then
  printf '%s\n' "error: concept note must be exactly 3 pages; found $PAGES" >&2
  exit 3
fi

NORMALIZED_SIZE=$(printf '%s' "$PAGE_SIZE" | tr '[:upper:]' '[:lower:]')
case "$NORMALIZED_SIZE" in
  *letter*|*612*x*792*pts*) ;;
  *)
    printf '%s\n' "error: concept note must use US Letter; pdfinfo reports: $PAGE_SIZE" >&2
    exit 3
    ;;
esac

TMP_TEXT=$(mktemp "${TMPDIR:-/tmp}/hadox-concept-note.XXXXXX.txt")
trap 'rm -f "$TMP_TEXT"' EXIT HUP INT TERM
pdftotext -layout "$PDF" "$TMP_TEXT"

TEXT_BYTES=$(wc -c < "$TMP_TEXT" | tr -d '[:space:]')
if [ "$TEXT_BYTES" -lt 800 ]; then
  printf '%s\n' "error: extracted PDF text is unexpectedly short ($TEXT_BYTES bytes)" >&2
  exit 3
fi
if ! grep -qi 'hadox' "$TMP_TEXT"; then
  printf '%s\n' "error: extracted PDF text does not contain the Hadox document identity" >&2
  exit 3
fi
if grep -EIn '(<[^>]+>|undefined|(^|[^[:alpha:]])NaN([^[:alpha:]]|$)|Ã|Â|�|^[[:space:]]*\{|\}[[:space:]]*$|/home/|/mnt/[a-z]/|[A-Za-z]:\\)' "$TMP_TEXT" >&2; then
  printf '%s\n' 'error: extracted PDF text contains leakage, broken Unicode, braces, or a local path' >&2
  exit 3
fi

printf '%s\n' "preflight ok: source contract, exactly 3 pages, US Letter, $TEXT_BYTES extracted text bytes"
