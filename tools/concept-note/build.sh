#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)

INPUT=${1:-docs/concept-note.md}
OUTPUT=${2:-docs/concept-note.pdf}

case "$INPUT" in
  /*) ;;
  *) INPUT="$REPO_ROOT/$INPUT" ;;
esac
case "$OUTPUT" in
  /*) ;;
  *) OUTPUT="$REPO_ROOT/$OUTPUT" ;;
esac

for command_name in pandoc xelatex pdfinfo pdftotext; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    printf '%s\n' "error: required command not found: $command_name" >&2
    exit 127
  fi
done

if [ ! -f "$INPUT" ]; then
  printf '%s\n' "error: Markdown source not found: $INPUT" >&2
  exit 2
fi
if [ ! -f "$REPO_ROOT/docs/assets/hadox-research-labs-lockup.png" ]; then
  printf '%s\n' "error: Hadox document lockup is missing" >&2
  exit 2
fi

mkdir -p "$(dirname -- "$OUTPUT")"
cd "$REPO_ROOT"

TEXINPUTS="$REPO_ROOT:$REPO_ROOT/docs:$REPO_ROOT/docs/assets:${TEXINPUTS:-}" \
pandoc "$INPUT" \
  --from=markdown+raw_tex+smart \
  --to=pdf \
  --standalone \
  --pdf-engine=xelatex \
  --pdf-engine-opt=-halt-on-error \
  --pdf-engine-opt=-interaction=nonstopmode \
  --include-in-header="$SCRIPT_DIR/preamble.tex" \
  --resource-path="$REPO_ROOT:$REPO_ROOT/docs:$REPO_ROOT/docs/assets" \
  --output="$OUTPUT"

sh "$SCRIPT_DIR/lint.sh" "$OUTPUT" "$INPUT"
printf '%s\n' "built: $OUTPUT"
