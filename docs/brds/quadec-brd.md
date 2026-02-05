---
title: "Quadec - Business Requirements Document"
description: "Business requirements for a web-based quadratic equation visualization tool for educational use"
author: "BRD Builder"
ms.date: 2026-02-05
ms.topic: reference
---

Version 0.1 | Status Draft | Owner Sarah Chen | Sponsor Dr. Michael Torres | Date 2026-02-05 | Business Unit Lincoln High School

## Progress Tracker

| Phase                | Done | Gaps                                   | Updated    |
| -------------------- | ---- | -------------------------------------- | ---------- |
| Business Context     | 95%  | None                                   | 2026-02-05 |
| Problem & Drivers    | 90%  | Quantified impact data                 | 2026-02-05 |
| Objectives & Metrics | 90%  | None                                   | 2026-02-05 |
| Stakeholders         | 95%  | None                                   | 2026-02-05 |
| Scope                | 95%  | None                                   | 2026-02-05 |
| Processes            | 50%  | As-is process formalization            | 2026-02-05 |
| Requirements         | 80%  | Acceptance criteria refinement         | 2026-02-05 |
| Data & Reporting     | 20%  | Analytics requirements                 | 2026-02-05 |
| Risks & Dependencies | 60%  | Risk assessment                        | 2026-02-05 |
| Implementation       | 90%  | None                                   | 2026-02-05 |

Unresolved Critical Questions: 0 | TBDs: 2

---

## Document Control

| Version | Date       | Author      | Summary of Changes        | Approved By |
| ------- | ---------- | ----------- | ------------------------- | ----------- |
| 0.1     | 2026-02-05 | BRD Builder | Initial draft from meeting transcript | Pending |

---

## 1. Business Context & Background

### 1.1 Overview

Quadec is a web-based educational tool designed to help students visualize and understand quadratic equations. The initiative addresses a persistent challenge in mathematics education where students can memorize formulas but struggle to connect equations to their graphical representations.

The tool enables students to manipulate coefficients in the standard quadratic form (y = ax² + bx + c) and immediately observe how changes affect the parabola, key features, and calculated values. This real-time feedback builds mathematical intuition beyond rote memorization.

### 1.2 Strategic Alignment

Quadec aligns with Lincoln High School's commitment to interactive, technology-enhanced learning in mathematics education. The tool directly supports the Algebra II and Pre-Calculus curriculum by providing students with hands-on exploration of quadratic concepts.

### 1.3 Drivers & Triggers

* Students struggle to connect quadratic equations to visual representations, limiting conceptual understanding
* Current teaching methods rely on static diagrams that cannot demonstrate dynamic relationships between coefficients and graph behavior
* Need for accessible, cross-platform tools that work in classroom, computer lab, and home environments without installation barriers

---

## 2. Problem Statement & Business Drivers

### 2.1 Current Situation (As-Is)

Mathematics educators teaching quadratic equations face a significant challenge: students can mechanically apply formulas (quadratic formula, vertex formula) without understanding what the results mean. When teachers discuss concepts like vertex, axis of symmetry, and discriminant, students memorize definitions but cannot explain why changing the 'a' coefficient makes a parabola wider or narrower, or why a negative discriminant means no real x-intercepts.

Current teaching approaches include:

* Static textbook diagrams showing example parabolas
* Teacher-drawn graphs on whiteboards with limited dynamic demonstration
* Graphing calculators with steep learning curves and limited availability
* Complex math software (like Desmos or GeoGebra) that includes features beyond quadratic focus

### 2.2 Problem Statement

Students in Algebra II and Pre-Calculus courses lack an intuitive understanding of quadratic equations because they cannot visualize the dynamic relationship between coefficients and graph behavior. This results in surface-level learning where students pass tests through memorization but fail to develop mathematical intuition needed for advanced coursework.

### 2.3 Impact of the Problem

| Impact Area              | Description                                                              | Magnitude | Evidence / Source              |
| ------------------------ | ------------------------------------------------------------------------ | --------- | ------------------------------ |
| Student comprehension    | Students can compute but not explain meaning of results                  | High      | Teacher observation            |
| Homework efficiency      | Students cannot verify understanding independently                       | Medium    | Student feedback               |
| Test performance         | Conceptual questions score lower than computational questions            | Medium    | TBD: Assessment data           |
| Advanced course readiness| Weak foundation in quadratics affects calculus and physics understanding | High      | Teacher experience (15 years)  |

---

## 3. Business Objectives & Success Metrics

### 3.1 Objectives

| Objective ID | Statement                                                                                  | Category   | Priority | Owner              |
| ------------ | ------------------------------------------------------------------------------------------ | ---------- | -------- | ------------------ |
| OBJ-01       | Enable students to visualize real-time relationship between coefficients and parabola     | Learning   | Must     | Dr. Michael Torres |
| OBJ-02       | Provide step-by-step solutions that demonstrate proper mathematical work format           | Learning   | Must     | Dr. Michael Torres |
| OBJ-03       | Ensure accessibility across all devices used by students (desktop, tablet, phone)         | Access     | Must     | Sarah Chen         |
| OBJ-04       | Support homework verification workflow without replacing learning process                 | Learning   | Should   | Dr. Michael Torres |
| OBJ-05       | Deliver performant experience on lower-end devices (school Chromebooks)                   | Technical  | Must     | Sarah Chen         |

### 3.2 Key Performance Indicators (KPIs)

| KPI                           | Baseline | Target      | Timeframe         | Data Source       | Notes                    |
| ----------------------------- | -------- | ----------- | ----------------- | ----------------- | ------------------------ |
| Regular student users         | 0        | >10 students| Spring 2026       | Usage observation | Primary success metric   |
| Cross-device accessibility    | 0%       | 100%        | Launch            | Browser testing   | Responsive design        |
| Page load time                | N/A      | <3s         | Launch            | Performance tests | On lower-end devices     |

### 3.3 Non-quantitative Success Criteria (Optional)

* Students demonstrate improved ability to explain "why" not just "how" for quadratic concepts
* Teachers can use shareable links for class assignments (future enhancement)
* Tool becomes a standard resource for quadratics unit

---

## 4. Stakeholders & Roles

### 4.1 Stakeholder Summary

| Stakeholder Group    | Role / Interest                     | Responsibilities                        | Influence | Engagement Approach       |
| -------------------- | ----------------------------------- | --------------------------------------- | --------- | ------------------------- |
| Dr. Michael Torres   | Sponsor, curriculum owner           | Define requirements, approve deliverables, validate solutions | High | Direct collaboration |
| Students             | End users                           | Provide feedback, validate usability    | High      | User testing              |
| Sarah Chen           | Technical PM, Developer             | Development with GitHub Copilot, project oversight | High | Project lead         |
| Alex Rivera          | Student representative              | Student perspective, peer recruitment   | Medium    | Testing and feedback      |

### 4.2 Users / Business Actors

| Actor / Persona         | Description                                        | Key Goals                                        | Pain Points                                      | Impact of Change              |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------ | ----------------------------- |
| High school student     | Algebra II / Pre-Calculus student (ages 15-18)     | Understand quadratics, verify homework, prepare for tests | Cannot visualize abstract concepts, formulas feel meaningless | Builds intuition through exploration |
| Mathematics teacher     | Educator teaching quadratic equations              | Help students understand concepts, not just compute | Limited tools for dynamic demonstration | Can assign interactive exploration |
| Homework-checking student | Student verifying work independently             | Confirm answers and understand mistakes          | No way to check work while learning              | Can verify without answer key |

---

## 5. Scope

### 5.1 In Scope

* Web-based single-page application accessible via modern browsers
* Coefficient input (a, b, c) with validation preventing a=0
* Real-time graph updates showing parabola with zoom and pan capabilities
* Display of six key features: equation, vertex, axis of symmetry, y-intercept, x-intercepts (with discriminant), direction
* Step-by-step solutions for vertex calculation, axis of symmetry, y-intercept, x-intercepts, discriminant, and quadratic formula
* Visual markers on graph for vertex and intercepts with interactive tooltips
* Responsive design for desktop, tablet, and mobile browsers
* Proper mathematical notation rendering (superscripts, fractions)
* Accessibility features: keyboard navigation, color contrast, screen reader support
* Default starting state (a=1, b=0, c=0) showing y = x²

### 5.2 Out of Scope

* User accounts or saved states (except URL-based state for future enhancement)
* Preset examples (future enhancement)
* Shareable URLs with encoded coefficients (future enhancement)
* Conversion between standard, vertex, and factored forms (future enhancement)
* Dark mode (future enhancement, but plan architecturally)
* Export graph as image (future enhancement)
* Copy-to-clipboard functionality (future enhancement)
* Teaching moment when a=0 (future enhancement)
* Native mobile applications

### 5.3 Boundaries & Interfaces

* Tool operates independently without backend services (client-side only)
* No integration with learning management systems required for initial version
* Browser compatibility: Modern versions of Chrome, Firefox, Safari, Edge

---

## 6. Current & Future Business Processes

### 6.1 As-Is Process Overview

Students learn quadratic equations through lecture, static examples, and practice problems with answer keys.

| Step | Actor   | Description                                    | Inputs                 | Outputs           | Pain Points                              |
| ---- | ------- | ---------------------------------------------- | ---------------------- | ----------------- | ---------------------------------------- |
| 1    | Teacher | Presents quadratic concepts via lecture        | Curriculum, textbook   | Notes, examples   | Cannot show dynamic relationships        |
| 2    | Student | Copies notes and worked examples               | Lecture content        | Written notes     | Passive learning                         |
| 3    | Student | Attempts practice problems                     | Homework assignment    | Completed work    | No immediate feedback on understanding   |
| 4    | Student | Checks answers against key                     | Answer key             | Right/wrong       | Doesn't explain why wrong                |
| 5    | Teacher | Reviews common mistakes in class               | Submitted homework     | Clarification     | Delayed feedback loop                    |

### 6.2 To-Be Process Overview

Students use Quadec to explore relationships between coefficients and graphs, verify work, and build intuition.

| Step | Actor   | Description                                    | Inputs                 | Outputs                    | Business Benefit                         |
| ---- | ------- | ---------------------------------------------- | ---------------------- | -------------------------- | ---------------------------------------- |
| 1    | Teacher | Presents concepts with live Quadec demonstration | Quadec, projector    | Dynamic visualization      | Shows coefficient-graph relationship live|
| 2    | Student | Explores Quadec independently after lecture    | Quadec                 | Built intuition            | Active learning through exploration      |
| 3    | Student | Works practice problems by hand                | Homework assignment    | Completed work             | Learning occurs through manual effort    |
| 4    | Student | Verifies work using Quadec step-by-step solutions | Own work, Quadec    | Confirmation or correction | Immediate, educational feedback          |
| 5    | Teacher | Assigns Quadec exploration as homework         | Shareable links (future) | Student insights         | Extends classroom learning               |

### 6.3 Business Rules

* Coefficient 'a' cannot equal zero (would convert quadratic to linear equation)
* All coefficient inputs must be valid numbers
* Graph must update in real-time as coefficients change
* Step-by-step solutions must match format expected on assessments

---

## 7. Business Requirements

> Each requirement expresses what the business needs, not the technical implementation.

| BR ID  | Title                     | Description                                                                                          | Objective(s) | Stakeholder(s) | Priority | Acceptance Criteria                                     |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------------- | ------------ | -------------- | -------- | ------------------------------------------------------- |
| BR-001 | Coefficient input         | Users can input values for coefficients a, b, and c with validation preventing a=0                  | OBJ-01       | Students, Teachers | Must | Inputs accept numeric values; a=0 shows warning message |
| BR-002 | Real-time graph update    | Graph updates immediately as coefficient values change                                               | OBJ-01       | Students, Teachers | Must | Graph reflects coefficient changes within 100ms         |
| BR-003 | Zoom and pan              | Users can zoom in/out and pan the coordinate plane to view different regions                        | OBJ-01       | Students       | Must     | User can navigate to see any vertex or intercept        |
| BR-004 | Key features display      | Display equation, vertex, axis of symmetry, y-intercept, x-intercepts, discriminant, and direction | OBJ-01, OBJ-02 | Students, Teachers | Must | All six features visible and update with coefficients |
| BR-005 | Step-by-step solutions    | Provide detailed calculation steps for each key feature and quadratic formula                       | OBJ-02, OBJ-04 | Students     | Must     | Steps show formula, substitution, and calculation       |
| BR-006 | Visual markers            | Display colored markers on graph for vertex and intercept points with coordinate tooltips           | OBJ-01       | Students       | Must     | Points are visible and distinguishable; tooltips show coordinates |
| BR-007 | Responsive design         | Interface adapts to desktop, tablet, and phone screen sizes                                          | OBJ-03       | Students       | Must     | Usable on Chrome on school Chromebook and mobile browser |
| BR-008 | Mathematical notation     | Display equations with proper mathematical formatting (superscripts, fractions)                     | OBJ-02       | Students, Teachers | Must | Notation matches textbook appearance                   |
| BR-009 | Keyboard accessibility    | All functionality accessible via keyboard navigation                                                 | OBJ-03       | Students       | Must     | Tab navigation, arrow keys for value adjustment work    |
| BR-010 | Color accessibility       | Color choices support colorblind users                                                               | OBJ-03       | Students       | Must     | Passes WCAG color contrast requirements                 |
| BR-011 | Performance               | Page loads quickly on lower-end devices (school Chromebooks)                                        | OBJ-05       | Students       | Must     | Initial load under 3 seconds on target devices          |
| BR-012 | Default state             | Tool loads with a=1, b=0, c=0 (y = x²) as clean starting point                                      | OBJ-01       | Students       | Should   | Initial graph shows standard parabola y = x²            |
| BR-013 | Direction indication      | Display whether parabola opens upward or downward with min/max label                                | OBJ-01, OBJ-02 | Students, Teachers | Must | Shows "Opens upward, vertex is a minimum" or equivalent |
| BR-014 | Axis of symmetry visual   | Draw axis of symmetry line on graph (dashed line through vertex)                                    | OBJ-01       | Students       | Should   | Visible dashed vertical line at x = -b/2a               |
| BR-015 | Tabbed solution navigation | Solutions organized by feature (vertex, axis, intercepts, etc.) not shown all at once             | OBJ-02       | Students       | Should   | Tabs labeled with feature name; one visible at a time   |

---

## 8. Data & Reporting Requirements

### 8.1 Data Needs

| Data Domain         | Description                           | Source System(s) | Consumer(s) | Quality Expectations |
| ------------------- | ------------------------------------- | ---------------- | ----------- | -------------------- |
| Coefficient values  | User-entered a, b, c values           | User input       | Application | Validated numeric    |
| Calculated features | Vertex, intercepts, discriminant, etc.| Computed locally | User display| Mathematically accurate |

### 8.2 Reporting & Analytics

| Report / Insight           | Purpose                              | Audience   | Frequency | Level of Detail |
| -------------------------- | ------------------------------------ | ---------- | --------- | --------------- |
| Usage analytics (optional) | Understand feature adoption          | PM, Teacher| TBD       | Aggregate only  |

---

## 9. Assumptions, Dependencies & Constraints

### 9.1 Assumptions

| ID   | Assumption                                                    | Impact if False                              | Owner       |
| ---- | ------------------------------------------------------------- | -------------------------------------------- | ----------- |
| A-01 | Students have access to devices with modern web browsers      | Would need to support older browsers         | Sarah Chen  |
| A-02 | School network allows access to Azure Static Web App          | No approval required per stakeholder input   | Sarah Chen  |
| A-03 | Teachers will integrate tool into curriculum                  | Low adoption, limited impact                 | Dr. Torres  |
| A-04 | No backend required for initial version                       | Architecture change if user accounts needed  | Sarah Chen  |

### 9.2 Dependencies

| Dependency                 | Type     | Criticality | Owner       | Notes                        |
| -------------------------- | -------- | ----------- | ----------- | ---------------------------- |
| Modern browser availability| External | High        | Schools     | Chrome, Firefox, Safari, Edge|
| Math rendering library     | Technical| Medium      | Sarah Chen  | TBD selection                |
| Graphing library           | Technical| High        | Sarah Chen  | TBD selection                |
| Azure Static Web App       | Infrastructure | High  | Sarah Chen  | Personal Azure subscription  |
| GitHub Copilot             | Development | High     | Sarah Chen  | AI-assisted development      |

### 9.3 Constraints

| Constraint               | Category  | Description                                          | Implication                           |
| ------------------------ | --------- | ---------------------------------------------------- | ------------------------------------- |
| Client-side only         | Technical | No backend infrastructure for initial version        | No user accounts or persistent storage|
| School Chromebook support| Technical | Must perform well on lower-end hardware             | Optimization required                 |
| Cross-platform browsers  | Technical | Must work on Chrome, Firefox, Safari, Edge          | Testing across browsers required      |
| 9-day timeline           | Schedule  | Launch target February 14, 2026                      | Focused scope, rapid development      |

---

## 10. Risks & Issues

### 10.1 Risks

| Risk ID | Description                            | Cause                       | Impact | Likelihood | Severity | Mitigation                        | Owner       | Status |
| ------- | -------------------------------------- | --------------------------- | ------ | ---------- | -------- | --------------------------------- | ----------- | ------ |
| R-01    | Poor performance on school devices    | Complex rendering, large libraries | Unusable tool | Medium | High | Performance testing early, optimization | Sarah Chen | Open |
| R-02    | Low teacher adoption                  | Learning curve, curriculum fit | Limited impact | Medium | Medium | Teacher training, easy sharing features | Dr. Torres | Open |
| R-03    | Accessibility gaps                    | Overlooked requirements     | Excludes students | Low | High | Accessibility testing, WCAG compliance | Sarah Chen | Open |

### 10.2 Known Issues (Pre-Existing)

| Issue ID | Description | Impact | Workaround | Owner | Status |
| -------- | ----------- | ------ | ---------- | ----- | ------ |
| (None identified) | | | | | |

---

## 11. Implementation & Change Considerations

### 11.1 Implementation Approach (High-Level)

Web-based single-page application developed by Sarah Chen with GitHub Copilot assistance. Client-side only for initial version to simplify deployment and avoid infrastructure requirements. Responsive design approach from the start.

**Hosting:** Azure Static Web App in personal Azure subscription
**Development:** Sarah Chen + GitHub Copilot
**Budget:** No constraints

### 11.2 Phasing & Milestones

| Phase       | Description                                | Target Dates     | Entry Criteria                  | Exit Criteria                           |
| ----------- | ------------------------------------------ | ---------------- | ------------------------------- | --------------------------------------- |
| Development | Core functionality implementation          | Feb 5-12, 2026   | BRD approved                    | All Must requirements functional        |
| Testing     | Testing with Dr. Torres and Alex           | Feb 12-13, 2026  | Working application             | Critical issues resolved                |
| Launch      | Deploy to Azure Static Web App             | Feb 14, 2026     | Testing complete                | Live and accessible to students         |

### 11.3 Change Management & Training

| Audience  | Change Impact       | Training Needs                          | Channel              | Timing    |
| --------- | ------------------- | --------------------------------------- | -------------------- | --------- |
| Teachers  | New teaching tool   | How to integrate into lessons           | Direct demonstration | Pre-launch|
| Students  | New learning resource | Brief introduction to features         | In-class demo        | Launch    |

---

## 12. Benefits & High-Level Economics (Optional)

### 12.1 Expected Benefits

| Benefit                         | Type        | Magnitude | Timing      | Confidence |
| ------------------------------- | ----------- | --------- | ----------- | ---------- |
| Improved conceptual understanding | Educational | High     | Semester    | Medium     |
| Reduced homework frustration     | Student experience | Medium | Immediate | High      |
| More effective demonstrations    | Teaching efficiency | Medium | Immediate | High      |
| Accessible across all devices    | Equity      | High      | Launch      | High       |

### 12.2 High-Level Cost Considerations

* **Development:** No direct cost (Sarah Chen + GitHub Copilot)
* **Hosting:** Azure Static Web App in personal Azure subscription (minimal/free tier expected)
* **Budget constraints:** None identified

---

## 13. Open Questions & Decisions

### 13.1 Open Questions

| Q ID | Question                                                   | Owner       | Due Date | Status   |
| ---- | ---------------------------------------------------------- | ----------- | -------- | -------- |
| Q-01 | What is the sponsoring organization (school, district)?    | Dr. Torres  | 2026-02-05 | Resolved |
| Q-02 | What are the quantitative KPI targets for student outcomes?| Dr. Torres  | 2026-02-05 | Resolved |
| Q-03 | Is there a budget or timeline constraint?                  | Sarah Chen  | 2026-02-05 | Resolved |
| Q-04 | What is the development/implementation approach?           | Sarah Chen  | 2026-02-05 | Resolved |
| Q-05 | Are there school IT approvals needed for deployment?       | Sarah Chen  | 2026-02-05 | Resolved |

**Resolved Answers:**

* Q-01: Lincoln High School is the sponsoring organization; Dr. Torres has approval authority
* Q-02: Success defined as >10 students using the tool regularly
* Q-03: Launch target February 14, 2026; no budget constraints
* Q-04: Sarah Chen developing with GitHub Copilot; hosting on Azure Static Web App
* Q-05: No school IT approval required

### 13.2 Key Decisions

| Decision ID | Decision                              | Date       | Decision Maker(s)   | Rationale                                   | Impact                      |
| ----------- | ------------------------------------- | ---------- | ------------------- | ------------------------------------------- | --------------------------- |
| D-01        | Web application over mobile app       | 2026-02-05 | All participants    | Cross-platform, no installation, works on school devices | Responsive web approach |
| D-02        | Project name: Quadec                  | 2026-02-05 | All participants    | Short, memorable, related to quadratic equation | Branding established      |
| D-03        | Standard form (ax²+bx+c) only for v1  | 2026-02-05 | Dr. Torres          | Solid foundation first, other forms later  | Reduced scope              |
| D-04        | Client-side only for initial version  | 2026-02-05 | Sarah Chen          | Simplifies deployment, no infrastructure   | No persistent user data    |

---

## 14. References & Appendices

### 14.1 Reference Materials

| Ref ID | Type       | Title / Description                            | Location                    | Notes                    |
| ------ | ---------- | ---------------------------------------------- | --------------------------- | ------------------------ |
| REF-01 | Transcript | Quadec Planning Meeting                        | meeting-transcript.vtt      | Source of requirements   |

### 14.2 Glossary

| Term                | Definition                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------- |
| Quadratic equation  | Polynomial equation of degree 2 in standard form: y = ax² + bx + c                         |
| Parabola            | U-shaped curve that is the graph of a quadratic equation                                    |
| Vertex              | Highest or lowest point of a parabola; calculated as (-b/2a, f(-b/2a))                     |
| Axis of symmetry    | Vertical line through the vertex; equation x = -b/2a                                        |
| Discriminant        | Value b² - 4ac that determines number of x-intercepts                                       |
| X-intercepts        | Points where parabola crosses x-axis (roots); found using quadratic formula                |
| Y-intercept         | Point where parabola crosses y-axis; always at (0, c)                                       |
| Quadratic formula   | x = (-b ± √(b²-4ac)) / 2a; used to find x-intercepts                                       |
| Standard form       | Quadratic equation written as y = ax² + bx + c                                              |
| Vertex form         | Quadratic equation written as y = a(x-h)² + k where (h,k) is vertex (future enhancement)  |
| Factored form       | Quadratic equation written as y = a(x-r₁)(x-r₂) where r₁,r₂ are roots (future enhancement)|

### 14.3 Additional Notes

The Quadec initiative emerged from 15 years of teaching experience observing students struggle to connect algebraic formulas with geometric understanding. The tool is designed to support learning rather than replace it, with the workflow expectation that students work problems by hand first, then verify using Quadec.

---

Generated 2026-02-05 by BRD Builder (mode: brd-builder)
