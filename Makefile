.PHONY: concept-note concept-note-check

concept-note:
	python tools/build_concept_note.py

concept-note-check:
	mkdir -p build
	python tools/build_concept_note.py --output build/concept-note.pdf
	test -s build/concept-note.pdf
