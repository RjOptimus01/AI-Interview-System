# AI Interview System Report Prompt Pack

This file gives you a ready-to-use prompt pack for generating a 30+ page B.Tech project report for the `AI Interview System` project in a format aligned with your attached Word template.

## Before You Start

Fill these placeholders before pasting the prompt into ChatGPT or another writing model:

- `[Student Name 1]`
- `[Student Name 2]`
- `[Roll Number 1]`
- `[Roll Number 2]`
- `[Guide Name]`
- `[Guide Designation]`
- `[Department Name]`
- `[University Name]`
- `[Submission Month, Year]`

## Template Style To Follow

The attached template indicates these formatting expectations:

- Use `Times New Roman`.
- Body text should read naturally when formatted as `12 pt`, justified, and `1.5` line spacing.
- Chapter titles should be centered and uppercase.
- Main headings should be uppercase and bold.
- Subheadings should be sentence case.
- Figures and tables should be numbered chapter-wise, such as `Figure 4.1`, `Table 3.2`.
- Include separate `List of Tables` and `List of Figures`.
- Include `References` and `Appendix`.
- Include project code and running-project snapshots in the appendix.

## Master Prompt

Copy everything below and paste it into the writing AI:

```text
Create a complete B.Tech final year project report for my project titled:

"AI Interview System"

The report must be 30 to 35+ pages long when pasted into MS Word and formatted. Write it in formal academic project-report language suitable for university submission. The report must follow the style and sequence of a standard engineering project template similar to a university Word report format.

Important formatting and structure instructions:
- Use content suitable for Times New Roman font.
- Normal body text should be written as if it will be formatted in 12 pt, justified, with 1.5 line spacing.
- Chapter titles should appear in uppercase style.
- Main headings should be uppercase/bold style.
- Subheadings should be sentence case.
- Keep the writing natural, academic, and project-report oriented.
- Make the report detailed enough to comfortably exceed 30 pages after formatting in Word.
- Do not keep the content short or generic.
- Do not use bullet points excessively; use proper paragraphs, subsections, explanations, tables, and figure placeholders.
- Add figure placeholders like: [Insert Figure 4.1: System Architecture]
- Add table placeholders like: [Insert Table 3.1: Software Requirements]
- Number figures and tables chapter-wise.
- Include appendix content for source code and project screenshots.
- Include running-project snapshot placeholders in the appendix.

Project details to use:
This project is an AI Interview System built as a web application.

Core features of the project:
1. User authentication with signup and login.
2. Resume upload support for PDF, DOCX, and TXT.
3. Automatic resume text extraction and candidate profile extraction.
4. AI-based generation of interview questions from resume content.
5. Interview types: HR, Technical, and Combined.
6. Voice-based answer input and transcript capture.
7. Optional camera-based interview mode.
8. Camera monitoring using MediaPipe face landmark detection to check whether the candidate is attentive and facing the screen.
9. AI-based interview answer evaluation with score, rating, strengths, weaknesses, and improvement suggestions.
10. ATS resume analysis and scoring, including keyword match, formatting, readability, and mistake detection.
11. Gamification features such as XP, streaks, rank, rewards, and daily challenge logic.
12. Practice history and result tracking.
13. Frontend built using React.
14. Backend built using Node.js and Express.
15. Resume parsing using Mammoth for DOCX and PDF parsing library for PDF.
16. Question bank support using CSV and Parquet datasets.
17. AI integration using OpenRouter API and a lightweight GPT model.
18. Local/browser storage for user-related data.

Technical stack:
- Frontend: React, JavaScript, Tailwind/CSS, Lucide icons
- Backend: Node.js, Express
- Middleware: Multer, CORS
- AI/API: OpenRouter
- Resume parsing: Mammoth, PDF parsing
- Face monitoring: MediaPipe Face Landmarker
- Data files: CSV and Parquet datasets

Use these real project behaviors in the report:
- Resume data is parsed and used to extract candidate summary details such as name, email, phone, skills, projects, achievements, and education.
- Interview questions are generated based on resume content and can be HR, Technical, or Combined.
- The interview process supports microphone-based answering and transcript capture.
- In camera mode, the system checks whether the candidate remains visible and attentive using face landmark tracking.
- Evaluation produces question-wise analysis, scores, strengths, weaknesses, speaking feedback, and improvement suggestions.
- ATS analysis evaluates formatting, section completeness, keyword relevance, readability, and resume mistakes.
- The system uses both dataset-backed logic and AI-based generation/evaluation.
- The backend exposes API endpoints for resume parsing, question generation, interview evaluation, and ATS scoring.
- The system stores user progress, rewards, recent sessions, and related data locally.

Now generate the report in this exact order:

1. Cover Page
Use placeholders for:
- Project title
- Submitted by student names
- University roll numbers
- Guide name
- Designation
- Department
- University name
- Month and year

2. Candidate's Declaration

3. Acknowledgement

4. Abstract
Write a strong abstract of around 1 full page describing the problem, objectives, approach, technologies used, and expected outcomes.

5. Table of Contents
Generate a realistic table of contents with chapter titles and subsection titles.

6. List of Tables

7. List of Figures

8. Abbreviations

9. Notations
Only include if relevant; otherwise keep short and project-appropriate.

10. Chapter 1: INTRODUCTION AND MOTIVATION
Include:
- Background of interview preparation problems
- Problems in traditional mock interview systems
- Need for AI-driven interview assistance
- Motivation behind the project
- Scope of AI in recruitment and candidate preparation
- Objectives overview
Make this chapter detailed, around 3 to 4 pages.

11. Chapter 2: OBJECTIVES OR PROBLEM STATEMENT
Include:
- Problem statement
- Existing issues faced by students/job seekers
- Main objectives
- Secondary objectives
- Expected outcomes
- Advantages of the proposed system
Write in detailed academic style.

12. Chapter 3: SOFTWARE AND HARDWARE REQUIREMENTS
Include:
- Functional requirements
- Non-functional requirements
- Software requirements
- Hardware requirements
- System requirement specification
- Feasibility considerations
- User requirements
- Constraints and assumptions
- Proper tables where useful

13. Chapter 4: PROJECT METHODOLOGY / DESIGN
Include:
- Overall development methodology
- System architecture
- Module-wise design
- Frontend and backend workflow
- Resume parsing pipeline
- Question generation flow
- Interview evaluation flow
- ATS analysis flow
- Camera monitoring workflow
- Data flow diagram
- Use case diagram explanation
- Activity diagram explanation
- Algorithm or pseudocode for:
  a. Resume extraction
  b. Interview question generation
  c. AI answer evaluation
  d. ATS scoring
  e. Camera attention monitoring
This chapter should be one of the longest and most technical chapters.

14. Chapter 5: IMPLEMENTATION AND RESULTS
Include:
- Module-wise implementation details
- Authentication module
- Resume upload and parsing module
- Question generation module
- Interview session module
- Voice answer capture module
- Camera mode implementation
- AI evaluation result generation
- ATS checker implementation
- Gamification and dashboard features
- API endpoints and backend logic
- Testing observations
- Sample outputs
- Result discussion
- Screenshots placeholders of running project
This chapter must be detailed and practical.

15. Chapter 6: CONCLUSION AND FUTURE SCOPE
Include:
- Overall conclusion
- Whether objectives were achieved
- Practical usefulness of the system
- Current limitations
- Future scope such as:
  - emotion analysis
  - multilingual interviews
  - real-time speech scoring
  - recruiter dashboard
  - cloud deployment
  - anti-cheating improvements

16. References
Include realistic academic references in IEEE-like style for:
- React
- Node.js
- Express
- MediaPipe
- ATS concepts
- Resume parsing
- AI interview systems
- OpenRouter or LLM-based evaluation
- Relevant research papers and web sources

17. Appendix A: Source Code Overview
Summarize important parts of the codebase and mention that full code can be attached.

18. Appendix B: Project Screenshots
Add placeholders for screenshots such as:
- Login page
- Signup page
- Resume upload page
- Interview type selection page
- Camera interview screen
- Voice interview screen
- ATS analysis page
- Result dashboard
- Score summary page

Use these cover-page placeholders exactly:
- Student 1: [Student Name 1]
- Student 2: [Student Name 2]
- Roll Number 1: [Roll Number 1]
- Roll Number 2: [Roll Number 2]
- Guide Name: [Guide Name]
- Guide Designation: [Guide Designation]
- Department: [Department Name]
- University: [University Name]
- Submission Date: [Submission Month, Year]

Additional writing rules:
- Make the report sound original and human-written.
- Avoid repeating the same sentence patterns.
- Write clear academic explanations for every module.
- Add enough depth so the final report is not superficial.
- Where helpful, include tables and figure placeholders.
- Use chapter numbering and subsection numbering correctly.
- Keep the report suitable for a final year CSE project submission.
- Do not leave sections empty.
- Do not shorten technical explanations.
- If any personal data is missing, use placeholders like [Student Name], [Roll Number], [Guide Name].
- Make the project sound implementable, practical, and technically valid.

Generate the report chapter by chapter in a polished format, with proper headings and subsection numbering.
```

## Recommended Generation Flow

Because a 30+ page report is usually too long for one answer, generate it in parts.

### Prompt 1: Front Matter

```text
Use the master prompt already provided for the AI Interview System report, but generate only these sections now:

1. Cover Page
2. Candidate's Declaration
3. Acknowledgement
4. Abstract
5. Table of Contents
6. List of Tables
7. List of Figures
8. Abbreviations
9. Notations

Keep the style formal, academic, and compatible with a B.Tech project report template. Do not generate later chapters yet.
```

### Prompt 2: Chapters 1 and 2

```text
Continue the same AI Interview System project report from the previous section. Keep the same academic tone, heading hierarchy, chapter numbering, figure/table numbering style, and Word-report format. Do not repeat previous content.

Generate only:

Chapter 1: INTRODUCTION AND MOTIVATION
Chapter 2: OBJECTIVES OR PROBLEM STATEMENT

Make Chapter 1 detailed enough for about 3 to 4 pages after Word formatting. Make both chapters specific to the actual project modules including resume parsing, AI question generation, ATS analysis, voice answering, camera monitoring, and gamification.
```

### Prompt 3: Chapters 3 and 4

```text
Continue the same AI Interview System project report from the previous section. Keep the same academic tone, heading hierarchy, chapter numbering, figure/table numbering style, and Word-report format. Do not repeat previous content.

Generate only:

Chapter 3: SOFTWARE AND HARDWARE REQUIREMENTS
Chapter 4: PROJECT METHODOLOGY / DESIGN

Make Chapter 4 one of the longest and most technical chapters. Include system architecture, module design, workflow explanations, data flow, use case discussion, activity flow, and pseudocode for resume extraction, question generation, answer evaluation, ATS scoring, and camera attention monitoring.
```

### Prompt 4: Chapters 5 and 6, References, Appendices

```text
Continue the same AI Interview System project report from the previous section. Keep the same academic tone, heading hierarchy, chapter numbering, figure/table numbering style, and Word-report format. Do not repeat previous content.

Generate only:

Chapter 5: IMPLEMENTATION AND RESULTS
Chapter 6: CONCLUSION AND FUTURE SCOPE
References
Appendix A: Source Code Overview
Appendix B: Project Screenshots

Make the implementation chapter detailed and practical. Include module-wise implementation, backend API explanation, testing observations, result discussion, and screenshot placeholders for the running system.
```

## Final Polishing Prompt

After the full report is generated, use this prompt once:

```text
Refine the full AI Interview System project report for final university submission. Keep all headings, chapter numbering, figure/table numbering, and section order unchanged. Improve grammar, consistency, academic tone, and transitions between sections without shortening the content. Preserve placeholders and screenshot markers. Ensure the final report remains detailed enough for 30+ pages in MS Word.
```

## Quick Acceptance Checklist

Use this checklist before finalizing the report:

- The report follows the same overall order as the university template.
- It includes declaration, acknowledgement, abstract, TOC, lists, chapters, references, and appendices.
- It reflects the real project modules rather than a generic interview app.
- It includes ATS analysis, AI evaluation, MediaPipe camera tracking, voice answering, and gamification.
- It includes figure and table placeholders.
- It is long and detailed enough for a 30+ page Word report.
- Personal university details have been replaced with your own information.

## Suggested Word Formatting After Generation

When you paste the generated report into Word, apply:

- Font: `Times New Roman`
- Body size: `12 pt`
- Chapter titles: `16 pt`, bold, uppercase, centered
- Main headings: `14 pt`, bold, uppercase, justified
- Subheadings: `12 pt`, normal or light emphasis, sentence case
- Paragraph alignment: `Justified`
- Line spacing: `1.5`
- Separate pages for cover page, declaration, acknowledgement, and abstract

## Notes

- This prompt pack is tailored to the actual codebase in this project.
- The project behavior referenced here includes React frontend flows, Express backend APIs, resume parsing, ATS scoring, dataset-backed interview logic, AI evaluation, and camera-based monitoring.
- You can also ask a writing model to convert the final output into a more humanized academic tone if needed, but keep all technical substance.
