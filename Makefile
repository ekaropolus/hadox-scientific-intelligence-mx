.PHONY: concept-note concept-note-check concept-note-lint

concept-note:
	sh tools/concept-note/build.sh docs/concept-note.md docs/concept-note.pdf

concept-note-check:
	mkdir -p build
	sh tools/concept-note/build.sh docs/concept-note.md build/concept-note.pdf

concept-note-lint:
	sh tools/concept-note/lint.sh docs/concept-note.pdf docs/concept-note.md
