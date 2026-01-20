#!/usr/bin/env python3
"""Generate a professional PDF resume for Clarke Plumo - Principal Software Engineer."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

# Professional color palette
NAVY = HexColor("#1e3a5f")
DARK_GRAY = HexColor("#333333")
MEDIUM_GRAY = HexColor("#555555")
LIGHT_GRAY = HexColor("#888888")
ACCENT = HexColor("#2563eb")


def create_styles():
    return {
        'name': ParagraphStyle(
            name='Name',
            fontSize=22,
            leading=26,
            alignment=TA_CENTER,
            textColor=NAVY,
            fontName='Helvetica-Bold',
            spaceAfter=2
        ),
        'title': ParagraphStyle(
            name='Title',
            fontSize=11,
            leading=14,
            alignment=TA_CENTER,
            textColor=ACCENT,
            fontName='Helvetica',
            spaceAfter=6
        ),
        'contact': ParagraphStyle(
            name='Contact',
            fontSize=9,
            leading=12,
            alignment=TA_CENTER,
            textColor=MEDIUM_GRAY,
            fontName='Helvetica',
            spaceAfter=10
        ),
        'section': ParagraphStyle(
            name='Section',
            fontSize=11,
            leading=14,
            textColor=NAVY,
            fontName='Helvetica-Bold',
            spaceBefore=12,
            spaceAfter=6,
            borderPadding=0
        ),
        'company': ParagraphStyle(
            name='Company',
            fontSize=10,
            leading=13,
            textColor=DARK_GRAY,
            fontName='Helvetica-Bold',
            spaceBefore=8,
            spaceAfter=1
        ),
        'role_date': ParagraphStyle(
            name='RoleDate',
            fontSize=9,
            leading=12,
            textColor=MEDIUM_GRAY,
            fontName='Helvetica-Oblique',
            spaceAfter=3
        ),
        'description': ParagraphStyle(
            name='Description',
            fontSize=9,
            leading=12,
            textColor=MEDIUM_GRAY,
            fontName='Helvetica',
            spaceAfter=4
        ),
        'bullet': ParagraphStyle(
            name='Bullet',
            fontSize=9,
            leading=12,
            textColor=DARK_GRAY,
            fontName='Helvetica',
            leftIndent=12,
            spaceAfter=2
        ),
        'summary': ParagraphStyle(
            name='Summary',
            fontSize=9,
            leading=13,
            textColor=DARK_GRAY,
            fontName='Helvetica',
            spaceAfter=4
        ),
        'skills_label': ParagraphStyle(
            name='SkillsLabel',
            fontSize=9,
            leading=12,
            textColor=NAVY,
            fontName='Helvetica-Bold',
        ),
        'skills_value': ParagraphStyle(
            name='SkillsValue',
            fontSize=9,
            leading=12,
            textColor=DARK_GRAY,
            fontName='Helvetica',
        ),
    }


def add_section_header(story, styles, text):
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=NAVY, spaceAfter=2))
    story.append(Paragraph(text.upper(), styles['section']))


def add_job(story, styles, company, role, date, description, bullets):
    story.append(Paragraph(f"{role}", styles['company']))
    story.append(Paragraph(f"<b>{company}</b> | {date}", styles['role_date']))
    if description:
        story.append(Paragraph(description, styles['description']))
    for bullet in bullets:
        story.append(Paragraph(f"\u2022 {bullet}", styles['bullet']))


def build_resume():
    doc = SimpleDocTemplate(
        "Clarke_Plumo_Resume.pdf",
        pagesize=letter,
        rightMargin=0.55*inch,
        leftMargin=0.55*inch,
        topMargin=0.45*inch,
        bottomMargin=0.45*inch
    )

    styles = create_styles()
    story = []

    # Header
    story.append(Paragraph("CLARKE PLUMO", styles['name']))
    story.append(Paragraph("Principal Software Engineer", styles['title']))
    story.append(Paragraph(
        "clarke.plumo@gmail.com  \u2022  github.com/clrke  \u2022  linkedin.com/in/clrke  \u2022  Philippines",
        styles['contact']
    ))

    # Summary
    add_section_header(story, styles, "Professional Summary")
    story.append(Paragraph(
        "Principal-level engineer with 10+ years designing and delivering high-scale systems across fintech, "
        "Web3, and consumer products. Track record of architecting platforms that process millions of transactions, "
        "leading distributed engineering teams, and founding technology-driven businesses. Deep expertise in "
        "full-stack development, blockchain infrastructure, and system design at scale.",
        styles['summary']
    ))

    # Professional Experience
    add_section_header(story, styles, "Professional Experience")

    add_job(story, styles,
        company="Metagood (OnChainMonkey & Osura)",
        role="Senior Full-stack Engineer",
        date="2021 \u2013 2025",
        description="Led architecture and development of multi-chain NFT platform serving 10,000+ token holders across Ethereum, Bitcoin, and Stacks blockchains.",
        bullets=[
            "Architected 32-package TypeScript monorepo (47,500+ LOC); delivered 1,282 commits across 4 years",
            "Designed cross-chain token tracking system with real-time event monitoring and database replication",
            "Built gamification infrastructure: dual-currency economy, XP progression, Discord/Twitter integrations",
            "Scaled read-heavy workloads using MySQL read replicas on AWS RDS",
            "Developed Osura marketplace for Bitcoin Ordinals with inscription and trading capabilities"
        ]
    )

    add_job(story, styles,
        company="Union Bank of the Philippines (via White Cloak Technologies)",
        role="Lead Back-end Engineer",
        date="2017 \u2013 2020",
        description="Led backend engineering for UnionBank Online, a mobile banking platform serving millions of active users.",
        bullets=[
            "Architected Java Spring Boot microservices on bare metal infrastructure processing millions of daily transactions",
            "Designed and implemented core banking APIs: fund transfers, bill payments, check deposits, account management",
            "Established backend development standards, code review practices, and deployment pipelines",
            "Mentored junior engineers and coordinated with cross-functional teams across mobile, QA, and operations"
        ]
    )

    add_job(story, styles,
        company="Smart Communications (via Solutions Resource Inc.)",
        role="Data Scientist",
        date="2014 \u2013 2016",
        description="Applied machine learning to telecommunications data for one of the Philippines' largest telcos.",
        bullets=[
            "Built NLP pipeline using Naive Bayes with n-grams for sentiment analysis on Twitter election data",
            "Developed predictive models driving marketing and customer retention strategies"
        ]
    )

    # Entrepreneurship
    add_section_header(story, styles, "Entrepreneurship & Leadership")

    add_job(story, styles,
        company="AtmosMed Pharmacy",
        role="Chief Technology Officer",
        date="2021 \u2013 Present",
        description="Founded and lead technology operations for a multi-branch pharmaceutical distribution company.",
        bullets=[
            "Scaled operations from 1 to 4 pharmacy branches across Tarlac, Philippines",
            "Architected distributed attendance system with biometric integration; achieved 99% data sync reduction",
            "Built multi-database inventory and quotation platform (Django, SQL Server, PostgreSQL)",
            "Deployed cloud infrastructure on Digital Ocean using Terraform with automated CI/CD pipelines"
        ]
    )

    add_job(story, styles,
        company="Squatopia",
        role="Founder & Lead Developer",
        date="2024 \u2013 Present",
        description="Designing and developing a VR fitness game for Meta Quest platforms.",
        bullets=[
            "Built Unity 6 application with 313+ C# scripts and Meta XR SDK integration",
            "Designed combat system with 300+ abilities across 4-tier skill tree; 15+ enemy AI behaviors",
            "Implemented fitness tracking for 15+ real-world movements with form validation",
            "Engineered localization framework supporting 34+ languages including RTL scripts"
        ]
    )

    add_job(story, styles,
        company="BetterGovPH",
        role="Technical Contributor",
        date="2025",
        description="Contributing to open-source initiative modernizing Philippine government digital services.",
        bullets=[
            "Developed React frontend components for portal serving 1,000+ indexed government services",
            "Integrated Meilisearch for full-text search; built serverless pipelines on Cloudflare Workers",
            "Implemented accessibility compliance (WCAG) with automated Playwright test coverage"
        ]
    )

    # Technical Expertise
    add_section_header(story, styles, "Technical Expertise")

    skills_data = [
        ("Languages", "TypeScript, JavaScript, Python, Java, Go, C#, Solidity"),
        ("Backend", "Node.js, Spring Boot, FastAPI, Django, Express"),
        ("Data", "PostgreSQL, MySQL, MongoDB, Redis, SQL Server"),
        ("Infrastructure", "AWS, Digital Ocean, Terraform, Docker, Kubernetes"),
        ("Blockchain", "Ethereum, Bitcoin Ordinals, Stacks, Smart Contracts, ethers.js"),
        ("Frontend", "React, Web3, GraphQL, REST API Design"),
        ("Specialized", "Unity/VR Development, Machine Learning, System Design"),
    ]

    for label, value in skills_data:
        story.append(Paragraph(
            f"<b>{label}:</b> {value}",
            styles['summary']
        ))

    # Build PDF
    doc.build(story)
    print("Resume PDF generated: Clarke_Plumo_Resume.pdf")


if __name__ == "__main__":
    build_resume()
