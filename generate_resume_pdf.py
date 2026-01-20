#!/usr/bin/env python3
"""Generate a professional PDF resume for Clarke Plumo."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# Colors
DARK_BLUE = HexColor("#1a365d")
MEDIUM_BLUE = HexColor("#2c5282")
DARK_GRAY = HexColor("#2d3748")
LIGHT_GRAY = HexColor("#718096")

def create_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='Name',
        fontSize=24,
        leading=28,
        alignment=TA_CENTER,
        textColor=DARK_BLUE,
        fontName='Helvetica-Bold',
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='Tagline',
        fontSize=11,
        leading=14,
        alignment=TA_CENTER,
        textColor=MEDIUM_BLUE,
        fontName='Helvetica',
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='Contact',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=LIGHT_GRAY,
        fontName='Helvetica',
        spaceAfter=12
    ))

    styles.add(ParagraphStyle(
        name='SectionHeader',
        fontSize=12,
        leading=16,
        textColor=DARK_BLUE,
        fontName='Helvetica-Bold',
        spaceBefore=14,
        spaceAfter=8
    ))

    styles.add(ParagraphStyle(
        name='JobTitle',
        fontSize=10,
        leading=14,
        textColor=DARK_GRAY,
        fontName='Helvetica-Bold',
        spaceBefore=8,
        spaceAfter=2
    ))

    styles.add(ParagraphStyle(
        name='JobDate',
        fontSize=9,
        leading=12,
        textColor=LIGHT_GRAY,
        fontName='Helvetica-Oblique',
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='BulletPoint',
        fontSize=9,
        leading=13,
        textColor=DARK_GRAY,
        fontName='Helvetica',
        leftIndent=12,
        spaceAfter=3
    ))

    styles.add(ParagraphStyle(
        name='ResumeBody',
        fontSize=9,
        leading=13,
        textColor=DARK_GRAY,
        fontName='Helvetica',
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='Skills',
        fontSize=9,
        leading=13,
        textColor=DARK_GRAY,
        fontName='Helvetica',
        spaceAfter=3
    ))

    return styles

def build_resume():
    doc = SimpleDocTemplate(
        "Clarke_Plumo_Resume.pdf",
        pagesize=letter,
        rightMargin=0.6*inch,
        leftMargin=0.6*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch
    )

    styles = create_styles()
    story = []

    # Header
    story.append(Paragraph("Clarke Plumo", styles['Name']))
    story.append(Paragraph("Full-stack Engineer | Blockchain Developer | Entrepreneur", styles['Tagline']))
    story.append(Paragraph(
        "clarke.plumo@gmail.com | github.com/clrke | linkedin.com/in/clrke | Philippines",
        styles['Contact']
    ))

    # Divider
    story.append(HRFlowable(width="100%", thickness=1, color=MEDIUM_BLUE, spaceAfter=6))

    # Summary
    story.append(Paragraph("SUMMARY", styles['SectionHeader']))
    story.append(Paragraph(
        "Software engineer with 10+ years building scalable fintech platforms, Web3 ecosystems, and VR experiences. "
        "Led backend engineering for Union Bank's mobile app serving millions of Filipinos. Pioneered Bitcoin Ordinals marketplaces. "
        "Currently shipping a VR game and running a pharmacy chain as CTO.",
        styles['ResumeBody']
    ))

    # Experience
    story.append(Paragraph("EXPERIENCE", styles['SectionHeader']))

    # Job 1
    story.append(Paragraph("Senior Full-stack Engineer | Metagood (OnChainMonkey & Osura)", styles['JobTitle']))
    story.append(Paragraph("2021 - 2025", styles['JobDate']))
    story.append(Paragraph(
        "\u2022 Built OnChainMonkey, one of the first 10K PFP collections stored entirely on-chain with all images and metadata generated in a single Ethereum transaction",
        styles['BulletPoint']
    ))
    story.append(Paragraph(
        "\u2022 Developed Osura, a premier marketplace for high-end Bitcoin Ordinals and digital art",
        styles['BulletPoint']
    ))

    # Job 2
    story.append(Paragraph("Lead Back-end Engineer | Union Bank of the Philippines", styles['JobTitle']))
    story.append(Paragraph("2017 - 2020 (via White Cloak Technologies)", styles['JobDate']))
    story.append(Paragraph(
        "\u2022 Architected backend services for UnionBank Online mobile app handling millions of transactions",
        styles['BulletPoint']
    ))
    story.append(Paragraph(
        "\u2022 Delivered core banking features: fund transfers, bill payments, check deposits, real-time account management",
        styles['BulletPoint']
    ))

    # Job 3
    story.append(Paragraph("Data Scientist | Smart Communications", styles['JobTitle']))
    story.append(Paragraph("2014 - 2016 (via Solutions Resource Inc.)", styles['JobDate']))
    story.append(Paragraph(
        "\u2022 Applied machine learning to telecommunications data, driving actionable business insights",
        styles['BulletPoint']
    ))

    # Entrepreneurship
    story.append(Paragraph("ENTREPRENEURSHIP", styles['SectionHeader']))

    story.append(Paragraph("<b>CTO, AtmosMed Pharmacy</b> (2021 - Present)", styles['Skills']))
    story.append(Paragraph(
        "Building and operating a community pharmacy chain in Tarlac, Philippines",
        styles['BulletPoint']
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Owner, Squatopia</b> (2024 - Present)", styles['Skills']))
    story.append(Paragraph(
        "Developing an infinite action roguelike VR game for Meta Quest",
        styles['BulletPoint']
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Early Contributor, BetterGovPH</b> (2025)", styles['Skills']))
    story.append(Paragraph(
        "Improving government services through technology",
        styles['BulletPoint']
    ))

    # Skills
    story.append(Paragraph("SKILLS", styles['SectionHeader']))

    skills_data = [
        ("<b>Languages:</b>", "JavaScript, TypeScript, Python, Go, Solidity, C#"),
        ("<b>Frontend:</b>", "React, Web3, GraphQL, REST APIs"),
        ("<b>Backend:</b>", "Node.js, PostgreSQL, MongoDB, Redis"),
        ("<b>Infrastructure:</b>", "AWS, Docker, Kubernetes"),
        ("<b>Blockchain:</b>", "Smart Contracts, Ethereum, Bitcoin Ordinals"),
        ("<b>Other:</b>", "Unity, VR Development, Data Science"),
    ]

    for label, skills in skills_data:
        story.append(Paragraph(f"{label} {skills}", styles['Skills']))

    # Build the PDF
    doc.build(story)
    print("Resume PDF generated: Clarke_Plumo_Resume.pdf")

if __name__ == "__main__":
    build_resume()
