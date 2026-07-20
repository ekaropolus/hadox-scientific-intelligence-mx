from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


@dataclass(frozen=True)
class Variant:
    key: str
    country: str
    accent: colors.Color
    accent_soft: colors.Color
    repo_url: str
    architecture: tuple[str, ...]


VARIANTS = {
    "mx": Variant(
        key="mx",
        country="Mexico",
        accent=colors.HexColor("#18A673"),
        accent_soft=colors.HexColor("#DDF5EC"),
        repo_url="github.com/ekaropolus/hadox-scientific-intelligence-mx",
        architecture=(
            "Official and licensed sources",
            "Normalized state packages",
            "Evidence and confidence checks",
            "Nine decision modules",
            "Reports, pilots, and 90-day boards",
        ),
    ),
    "nl": Variant(
        key="nl",
        country="Netherlands",
        accent=colors.HexColor("#F07A24"),
        accent_soft=colors.HexColor("#FFF0E3"),
        repo_url="github.com/ekaropolus/hadox-scientific-intelligence-nl",
        architecture=(
            "Dutch official and open sources",
            "Normalized province packages",
            "Source, privacy, and quality gates",
            "Product and package scoring",
            "Narratives, audits, and execution boards",
        ),
    ),
}

DEFAULT_VARIANT = "mx"
REPOSITORY_ROOT = Path(__file__).resolve().parents[1]


def inline_markup(text: str) -> str:
    escaped = html.escape(text.strip())
    escaped = re.sub(r"`([^`]+)`", r'<font name="Courier">\1</font>', escaped)
    escaped = re.sub(
        r"\[([^\]]+)\]\((https?://[^)]+)\)",
        r'<link href="\2" color="#2457C5"><u>\1</u></link>',
        escaped,
    )
    return escaped


def parse_markdown(path: Path) -> tuple[str, list[tuple[str, list[tuple[str, object]]]]]:
    lines = path.read_text(encoding="utf-8").splitlines()
    title = next((line[2:].strip() for line in lines if line.startswith("# ")), path.stem)
    sections: list[tuple[str, list[tuple[str, object]]]] = []
    current_title = "Overview"
    blocks: list[tuple[str, object]] = []
    paragraph: list[str] = []
    bullets: list[str] = []
    ordered: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(("paragraph", " ".join(part.strip() for part in paragraph)))
            paragraph = []

    def flush_lists() -> None:
        nonlocal bullets, ordered
        if bullets:
            blocks.append(("bullets", bullets))
            bullets = []
        if ordered:
            blocks.append(("ordered", ordered))
            ordered = []

    def flush_section() -> None:
        flush_paragraph()
        flush_lists()
        if blocks:
            sections.append((current_title, list(blocks)))
            blocks.clear()

    for raw in lines:
        line = raw.rstrip()
        if line.startswith("# "):
            continue
        if line.startswith("## "):
            flush_section()
            current_title = line[3:].strip()
            continue
        if not line.strip():
            flush_paragraph()
            flush_lists()
            continue
        if line.startswith("- "):
            flush_paragraph()
            if ordered:
                flush_lists()
            bullets.append(line[2:].strip())
            continue
        ordered_match = re.match(r"^\d+\.\s+(.+)$", line)
        if ordered_match:
            flush_paragraph()
            if bullets:
                flush_lists()
            ordered.append(ordered_match.group(1).strip())
            continue
        if line.startswith("**") and line.endswith("**"):
            flush_paragraph()
            blocks.append(("meta", line.strip("* ")))
            continue
        paragraph.append(line.strip().rstrip("  "))

    flush_section()
    return title, sections


class ArchitectureFlow(Flowable):
    def __init__(self, labels: tuple[str, ...], accent: colors.Color):
        super().__init__()
        self.labels = labels
        self.accent = accent
        self.width = 166 * mm
        self.height = 47 * mm

    def draw(self) -> None:
        canvas = self.canv
        gap = 3 * mm
        box_width = (self.width - gap * (len(self.labels) - 1)) / len(self.labels)
        y = 8 * mm
        for index, label in enumerate(self.labels):
            x = index * (box_width + gap)
            canvas.setFillColor(colors.HexColor("#F4F5F7"))
            canvas.setStrokeColor(self.accent)
            canvas.setLineWidth(1.2)
            canvas.roundRect(x, y, box_width, 30 * mm, 3 * mm, fill=1, stroke=1)
            canvas.setFillColor(self.accent)
            canvas.circle(x + 5 * mm, y + 24 * mm, 2.6 * mm, fill=1, stroke=0)
            canvas.setFillColor(colors.white)
            canvas.setFont("Helvetica-Bold", 7)
            canvas.drawCentredString(x + 5 * mm, y + 22.5 * mm, str(index + 1))
            paragraph = Paragraph(
                inline_markup(label),
                ParagraphStyle(
                    "ArchitectureBox",
                    fontName="Helvetica-Bold",
                    fontSize=7.8,
                    leading=9.5,
                    textColor=colors.HexColor("#15171A"),
                    alignment=TA_LEFT,
                ),
            )
            paragraph.wrapOn(canvas, box_width - 8 * mm, 18 * mm)
            paragraph.drawOn(canvas, x + 4 * mm, y + 5 * mm)
            if index < len(self.labels) - 1:
                start = x + box_width + 0.6 * mm
                end = start + gap - 1.2 * mm
                canvas.setStrokeColor(colors.HexColor("#747982"))
                canvas.line(start, y + 15 * mm, end, y + 15 * mm)
                canvas.line(end - 1.5 * mm, y + 16.2 * mm, end, y + 15 * mm)
                canvas.line(end - 1.5 * mm, y + 13.8 * mm, end, y + 15 * mm)


def build_styles(variant: Variant):
    sample = getSampleStyleSheet()
    return {
        "cover_label": ParagraphStyle(
            "CoverLabel",
            parent=sample["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=variant.accent,
            spaceAfter=8 * mm,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=sample["Title"],
            fontName="Helvetica-Bold",
            fontSize=32,
            leading=37,
            textColor=colors.white,
            spaceAfter=9 * mm,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=sample["Normal"],
            fontName="Helvetica",
            fontSize=13,
            leading=19,
            textColor=colors.HexColor("#D4D7DC"),
        ),
        "h1": ParagraphStyle(
            "Section",
            parent=sample["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=21,
            leading=25,
            textColor=colors.HexColor("#111318"),
            spaceBefore=4 * mm,
            spaceAfter=5 * mm,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=14.5,
            textColor=colors.HexColor("#30343A"),
            spaceAfter=3.5 * mm,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=12,
            textColor=variant.accent,
            spaceAfter=2 * mm,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=sample["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13,
            textColor=colors.HexColor("#30343A"),
            leftIndent=2 * mm,
        ),
        "callout": ParagraphStyle(
            "Callout",
            parent=sample["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=16,
            textColor=colors.HexColor("#111318"),
            backColor=variant.accent_soft,
            borderColor=variant.accent,
            borderWidth=1,
            borderPadding=10,
            spaceBefore=3 * mm,
            spaceAfter=5 * mm,
        ),
    }


def draw_page(canvas, doc, variant: Variant, title: str) -> None:
    width, height = A4
    if doc.page == 1:
        canvas.saveState()
        canvas.setFillColor(colors.HexColor("#0B0D10"))
        canvas.rect(0, 0, width, height, fill=1, stroke=0)
        canvas.setFillColor(variant.accent)
        canvas.rect(0, 0, 11 * mm, height, fill=1, stroke=0)
        canvas.restoreState()
        return

    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#D9DCE1"))
    canvas.line(22 * mm, height - 17 * mm, width - 22 * mm, height - 17 * mm)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(colors.HexColor("#4D525A"))
    canvas.drawString(22 * mm, height - 13 * mm, "HADOX RESEARCH LABS")
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(width - 22 * mm, height - 13 * mm, title)
    canvas.setStrokeColor(colors.HexColor("#D9DCE1"))
    canvas.line(22 * mm, 16 * mm, width - 22 * mm, 16 * mm)
    canvas.setFont("Helvetica", 7.2)
    canvas.setFillColor(colors.HexColor("#666B73"))
    canvas.drawString(22 * mm, 10.5 * mm, variant.repo_url)
    canvas.drawRightString(width - 22 * mm, 10.5 * mm, f"{doc.page}")
    canvas.restoreState()


def render(input_path: Path, output_path: Path, variant: Variant) -> None:
    title, sections = parse_markdown(input_path)
    styles = build_styles(variant)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=22 * mm,
        rightMargin=22 * mm,
        topMargin=24 * mm,
        bottomMargin=22 * mm,
        title=title,
        author="Hadox Research Labs",
        subject=f"Open concept note for {variant.country} Scientific Intelligence",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates(
        [PageTemplate(id="all", frames=[frame], onPage=lambda c, d: draw_page(c, d, variant, title))]
    )

    story = [
        Spacer(1, 48 * mm),
        Paragraph("OPEN RESEARCH PROTOTYPE / CONCEPT NOTE", styles["cover_label"]),
        Paragraph(inline_markup(title.replace("Concept Note: ", "")), styles["cover_title"]),
        Paragraph(
            "Evidence infrastructure for transparent regional capability, science-to-market, and investment analysis.",
            styles["cover_subtitle"],
        ),
        Spacer(1, 52 * mm),
        Paragraph("HADOX RESEARCH LABS", styles["cover_label"]),
        Paragraph("Version 1.0 - July 2026<br/>Apache-2.0 open core", styles["cover_subtitle"]),
        PageBreak(),
    ]

    page_break_before = {
        "What exists in the open core",
        "Evidence and governance",
        "Open contribution roadmap",
    }

    for section_title, blocks in sections:
        if section_title == "Overview":
            continue
        if section_title in page_break_before and story and not isinstance(story[-1], PageBreak):
            story.append(PageBreak())
        story.append(Paragraph(inline_markup(section_title), styles["h1"]))
        story.append(Spacer(1, 1 * mm))

        for kind, value in blocks:
            if kind == "paragraph":
                text = str(value)
                if text.startswith("The system follows a staged evidence path:") or text.startswith("The evidence flow is staged:"):
                    story.append(Paragraph(inline_markup(text), styles["body"]))
                elif text.startswith("`") and "->" in text:
                    continue
                else:
                    story.append(Paragraph(inline_markup(text), styles["body"]))
            elif kind == "meta":
                story.append(Paragraph(inline_markup(str(value)), styles["meta"]))
            elif kind in {"bullets", "ordered"}:
                items = [
                    ListItem(Paragraph(inline_markup(str(item)), styles["bullet"]), leftIndent=4 * mm)
                    for item in value
                ]
                list_options = {
                    "bulletType": "1" if kind == "ordered" else "bullet",
                    "leftIndent": 6 * mm,
                    "bulletFontName": "Helvetica-Bold",
                    "bulletFontSize": 8,
                    "bulletColor": variant.accent,
                    "spaceAfter": 4 * mm,
                }
                if kind == "ordered":
                    list_options["start"] = "1"
                story.append(ListFlowable(items, **list_options))

        if section_title == "Architecture":
            story.append(Spacer(1, 3 * mm))
            story.append(KeepTogether([ArchitectureFlow(variant.architecture, variant.accent)]))
        if section_title == "Current maturity":
            story.append(
                Paragraph(
                    "Maturity statement: open methodological baseline; human review and source-specific validation remain mandatory.",
                    styles["callout"],
                )
            )

    doc.build(story)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--input",
        type=Path,
        default=REPOSITORY_ROOT / "docs" / "concept-note.md",
        help="Markdown source (default: docs/concept-note.md)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=REPOSITORY_ROOT / "docs" / "concept-note.pdf",
        help="Generated PDF (default: docs/concept-note.pdf)",
    )
    parser.add_argument("--variant", choices=sorted(VARIANTS), default=DEFAULT_VARIANT)
    args = parser.parse_args()
    render(args.input, args.output, VARIANTS[args.variant])


if __name__ == "__main__":
    main()
