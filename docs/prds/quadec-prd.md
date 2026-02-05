<!-- markdownlint-disable-file -->
<!-- markdown-table-prettify-ignore-start -->
# Quadec - Product Requirements Document (PRD)

Version 0.1 | Status Draft | Owner Sarah Chen | Team Quadec | Target February 14, 2026 | Lifecycle Development

## Progress Tracker

| Phase              | Done | Gaps                              | Updated    |
| ------------------ | ---- | --------------------------------- | ---------- |
| Context            | 95%  | None                              | 2026-02-05 |
| Problem & Users    | 95%  | None                              | 2026-02-05 |
| Scope              | 95%  | None                              | 2026-02-05 |
| Requirements       | 90%  | Acceptance criteria refinement    | 2026-02-05 |
| Metrics & Risks    | 80%  | Risk mitigation details           | 2026-02-05 |
| Operationalization | 70%  | Deployment details                | 2026-02-05 |
| Finalization       | 0%   | Testing, review                   | 2026-02-05 |

Unresolved Critical Questions: 0 | TBDs: 0

## 1. Executive Summary

### Context

Quadec is a web-based single-page application designed to help high school students visualize and understand quadratic equations. The tool enables students to manipulate coefficients in the standard quadratic form (y = ax² + bx + c) and immediately observe how changes affect the parabola, key features, and calculated values. This real-time feedback builds mathematical intuition beyond rote memorization.

The application will be deployed as an Azure Static Web App, requiring no backend services for the initial version.

### Core Opportunity

Mathematics educators face a persistent challenge: students can memorize quadratic formulas but struggle to connect equations to their graphical representations. Current teaching approaches rely on static diagrams that cannot demonstrate dynamic relationships. Quadec fills this gap by providing an interactive, accessible tool that works across all devices without installation barriers.

### Goals

| Goal ID | Statement                                                                           | Type       | Baseline | Target      | Timeframe     | Priority |
| ------- | ----------------------------------------------------------------------------------- | ---------- | -------- | ----------- | ------------- | -------- |
| G-001   | Enable real-time visualization of coefficient-to-graph relationships               | Learning   | N/A      | Functional  | Launch        | Must     |
| G-002   | Provide step-by-step solutions matching assessment format                           | Learning   | N/A      | Functional  | Launch        | Must     |
| G-003   | Ensure cross-device accessibility (desktop, tablet, mobile)                         | Access     | 0%       | 100%        | Launch        | Must     |
| G-004   | Support homework verification workflow without replacing learning                   | Learning   | N/A      | Functional  | Launch        | Should   |
| G-005   | Deliver performant experience on lower-end devices (school Chromebooks)            | Technical  | N/A      | <3s load    | Launch        | Must     |
| G-006   | Achieve comprehensive test coverage for reliability                                 | Quality    | 0%       | ≥80%        | Launch        | Must     |

## 2. Problem Definition

### Current Situation

Students in Algebra II and Pre-Calculus courses learn quadratic equations through lecture, static textbook diagrams, and practice problems with answer keys. Teachers have limited tools for dynamic demonstration, and students cannot independently explore coefficient-graph relationships.

Current approaches include:

* Static textbook diagrams showing example parabolas
* Teacher-drawn graphs on whiteboards with limited dynamic demonstration
* Graphing calculators with steep learning curves and limited availability
* Complex math software with features beyond quadratic focus

### Problem Statement

Students lack an intuitive understanding of quadratic equations because they cannot visualize the dynamic relationship between coefficients and graph behavior. This results in surface-level learning where students pass tests through memorization but fail to develop mathematical intuition needed for advanced coursework.

### Root Causes

* No immediate visual feedback when exploring coefficient changes
* Existing tools are either too complex or too limited for focused quadratic exploration
* Static resources cannot demonstrate dynamic relationships

### Impact of Inaction

Without intervention, students continue to compute without understanding, limiting their preparation for calculus and physics courses. Teachers lack effective tools for demonstrating quadratic concepts dynamically.

## 3. Users & Personas

| Persona                  | Goals                                                  | Pain Points                                        | Impact                                     |
| ------------------------ | ------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------ |
| High school student      | Understand quadratics, verify homework, prepare for tests | Cannot visualize abstract concepts, formulas feel meaningless | Builds intuition through exploration    |
| Mathematics teacher      | Help students understand concepts, not just compute    | Limited tools for dynamic demonstration            | Can assign interactive exploration         |
| Homework-checking student| Confirm answers and understand mistakes                | No way to check work while learning                | Can verify with educational feedback       |

### User Personas Detail

**Alex (Student, Age 16)**
Junior in Pre-Calculus. Can plug numbers into the quadratic formula but struggles to understand what the answer means. Uses laptop or Chromebook for homework. Wants to verify work before submission and understand why answers are wrong.

**Dr. Torres (Teacher, 15 years experience)**
Teaches Algebra II and Pre-Calculus. Wants students to understand "why" not just "how." Needs a tool for live classroom demonstrations and homework assignments.

## 4. Scope

### In Scope

* Web-based single-page application accessible via modern browsers
* Coefficient input (a, b, c) with validation preventing a=0
* Real-time graph updates showing parabola with zoom and pan capabilities
* Display of six key features: equation, vertex, axis of symmetry, y-intercept, x-intercepts (with discriminant), direction
* Step-by-step solutions for vertex, axis of symmetry, y-intercept, x-intercepts, discriminant, and quadratic formula
* Visual markers on graph for vertex and intercepts with interactive tooltips
* Axis of symmetry dashed line on graph
* Responsive design for desktop, tablet, and mobile browsers
* Proper mathematical notation rendering (superscripts, fractions)
* Accessibility features: keyboard navigation, WCAG 2.1 AA compliance, screen reader support
* Default starting state (a=1, b=0, c=0) showing y = x²
* Unit testing with ≥80% code coverage
* UI testing validated on desktop and mobile resolutions
* Deployment to Azure Static Web App

### Out of Scope

* User accounts or saved states (except URL-based state for future enhancement)
* Preset examples (future enhancement)
* Shareable URLs with encoded coefficients (future enhancement)
* Conversion between standard, vertex, and factored forms (future enhancement)
* Dark mode (future enhancement, but plan architecturally)
* Export graph as image (future enhancement)
* Copy-to-clipboard functionality (future enhancement)
* Teaching moment when a=0 (future enhancement)
* Native mobile applications
* Backend services or database

### Assumptions

* Students have access to devices with modern web browsers (Chrome, Firefox, Safari, Edge)
* School network allows access to Azure Static Web App (no approval required per stakeholder input)
* Teachers will integrate the tool into curriculum
* Client-side only architecture is sufficient for initial version

### Constraints

* Client-side only (no backend infrastructure)
* Must perform well on lower-end hardware (school Chromebooks)
* Must work across Chrome, Firefox, Safari, Edge
* 9-day timeline (launch target February 14, 2026)

## 5. Product Overview

### Value Proposition

Quadec transforms quadratic equation learning from passive memorization to active exploration by providing instant visual feedback as students manipulate coefficients. Unlike complex graphing software, Quadec focuses exclusively on quadratics with step-by-step solutions that match classroom assessment formats.

### UX / UI Considerations

* Graph as visual centerpiece with coefficient inputs prominently displayed
* Key features summary visible without scrolling on desktop
* Step-by-step solutions organized in tabs (not all displayed at once)
* Mobile layout: graph visible first, inputs above/below, solutions in collapsible section
* Clean, modern design that students find engaging
* Proper mathematical notation matching textbook appearance

| UX Element              | Status  |
| ----------------------- | ------- |
| Mobile-first responsive | Planned |
| Tab navigation          | Planned |
| Color accessibility     | Planned |
| Keyboard navigation     | Planned |

## 6. Functional Requirements

| FR ID   | Title                        | Description                                                                                                   | Goals             | Personas         | Priority | Acceptance Criteria                                                     | Notes |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------- | ----------------------------------------------------------------------- | ----- |
| FR-001  | Coefficient input            | Users can input values for coefficients a, b, and c using number input fields with step buttons              | G-001             | Student, Teacher | Must     | Inputs accept numeric values; increment/decrement buttons available     |       |
| FR-002  | Coefficient validation       | System prevents a=0 and shows explanatory warning message                                                     | G-001             | Student, Teacher | Must     | a=0 displays warning; last valid value retained                         |       |
| FR-003  | Input error handling         | Invalid inputs (non-numeric) are rejected with visual feedback (e.g., red border)                            | G-001             | Student          | Must     | Invalid input shows error state; last valid value retained              |       |
| FR-004  | Real-time graph update       | Graph updates immediately as coefficient values change                                                        | G-001             | Student, Teacher | Must     | Graph reflects coefficient changes within 100ms                         |       |
| FR-005  | Coordinate plane display     | Graph displays parabola on coordinate plane with x and y axes and grid lines                                 | G-001             | Student          | Must     | Standard axes visible with grid                                         |       |
| FR-006  | Zoom functionality           | Users can zoom in/out on the coordinate plane                                                                 | G-001             | Student          | Must     | Zoom controls available; view scales appropriately                      |       |
| FR-007  | Pan functionality            | Users can pan/drag the coordinate plane to view different regions                                             | G-001             | Student          | Must     | Drag navigation works; can navigate to any vertex or intercept          |       |
| FR-008  | Equation display             | Display current equation with coefficients substituted (e.g., y = 2x² + 3x - 1)                              | G-001, G-002      | Student, Teacher | Must     | Equation updates with coefficient changes; proper notation              |       |
| FR-009  | Vertex display               | Display vertex coordinates with label                                                                         | G-001, G-002      | Student, Teacher | Must     | Vertex (h, k) shown and updates correctly                               |       |
| FR-010  | Axis of symmetry display     | Display axis of symmetry equation (x = -b/2a)                                                                 | G-001, G-002      | Student, Teacher | Must     | Axis equation shown and updates correctly                               |       |
| FR-011  | Axis of symmetry visual      | Draw dashed vertical line on graph at axis of symmetry                                                        | G-001             | Student          | Should   | Dashed line visible at x = -b/2a                                        |       |
| FR-012  | Y-intercept display          | Display y-intercept coordinate (0, c)                                                                         | G-001, G-002      | Student, Teacher | Must     | Y-intercept shown and updates correctly                                 |       |
| FR-013  | X-intercepts display         | Display x-intercept coordinates when they exist                                                               | G-001, G-002      | Student, Teacher | Must     | Shows both, one, or indicates none based on discriminant                |       |
| FR-014  | Discriminant display         | Display discriminant value (b² - 4ac) with interpretation                                                    | G-001, G-002      | Student, Teacher | Must     | Shows value and meaning (two roots, one root, no real roots)            |       |
| FR-015  | Direction display            | Display whether parabola opens upward or downward with min/max label                                          | G-001, G-002      | Student, Teacher | Must     | Shows "Opens upward, vertex is minimum" or equivalent                   |       |
| FR-016  | Vertex marker                | Display colored marker on graph at vertex point with tooltip showing coordinates                              | G-001             | Student          | Must     | Marker visible; tooltip shows coordinates on hover/tap                  |       |
| FR-017  | X-intercept markers          | Display colored markers on graph at x-intercept points (when they exist) with tooltips                       | G-001             | Student          | Must     | Markers visible when intercepts exist; tooltips show coordinates        |       |
| FR-018  | Y-intercept marker           | Display colored marker on graph at y-intercept point with tooltip                                             | G-001             | Student          | Must     | Marker visible; tooltip shows coordinates on hover/tap                  |       |
| FR-019  | Distinguishable markers      | Different colors/styles for vertex, x-intercepts, and y-intercept markers                                    | G-001             | Student          | Must     | Each marker type visually distinguishable                               |       |
| FR-020  | Vertex solution steps        | Step-by-step solution showing vertex calculation (formula, substitution, result)                              | G-002, G-004      | Student          | Must     | Steps show: formula → substitution → calculation → answer               |       |
| FR-021  | Axis of symmetry solution    | Step-by-step solution for axis of symmetry                                                                    | G-002, G-004      | Student          | Must     | Steps show formula and calculation                                      |       |
| FR-022  | Y-intercept solution         | Step-by-step solution explaining y-intercept                                                                  | G-002, G-004      | Student          | Must     | Steps explain why y-intercept is (0, c)                                 |       |
| FR-023  | X-intercepts solution        | Step-by-step solution for x-intercepts using quadratic formula                                                | G-002, G-004      | Student          | Must     | Steps show formula, substitution, discriminant, final values            |       |
| FR-024  | Discriminant solution        | Step-by-step solution for discriminant calculation and interpretation                                        | G-002, G-004      | Student          | Must     | Steps show b²-4ac calculation and meaning                               |       |
| FR-025  | Quadratic formula solution   | Complete step-by-step quadratic formula walkthrough                                                           | G-002, G-004      | Student          | Must     | Full formula application with current coefficients                      |       |
| FR-026  | Tabbed solution navigation   | Solutions organized by feature in tabs (Vertex, Axis, Y-Intercept, etc.)                                     | G-002             | Student          | Should   | Tabs labeled clearly; one solution visible at a time                    |       |
| FR-027  | Mathematical notation        | Display equations with proper formatting (superscripts, fractions, radicals)                                 | G-002             | Student, Teacher | Must     | Notation matches textbook appearance                                    |       |
| FR-028  | Default state                | Application loads with a=1, b=0, c=0 showing y = x²                                                          | G-001             | Student          | Should   | Initial graph shows standard parabola                                   |       |
| FR-029  | Responsive desktop layout    | Interface displays properly on desktop screens (≥1024px width)                                               | G-003             | Student, Teacher | Must     | All elements accessible without horizontal scrolling                    |       |
| FR-030  | Responsive tablet layout     | Interface adapts to tablet screens (768px-1023px width)                                                       | G-003             | Student          | Must     | All elements accessible; may stack vertically                           |       |
| FR-031  | Responsive mobile layout     | Interface adapts to mobile screens (<768px width), graph visible first                                        | G-003             | Student          | Must     | Graph visible without scrolling; inputs and solutions accessible        |       |
| FR-032  | Keyboard navigation          | All functionality accessible via keyboard (tab navigation, arrow keys for values)                            | G-003             | Student          | Must     | Can navigate and use all features without mouse                         |       |
| FR-033  | Color accessibility          | Color choices support colorblind users                                                                        | G-003             | Student          | Must     | Passes WCAG 2.1 AA color contrast requirements                          |       |
| FR-034  | Screen reader support        | Data values and key features accessible to screen readers                                                     | G-003             | Student          | Must     | Proper ARIA labels and semantic structure                               |       |
| FR-035  | Performance optimization     | Page loads quickly on lower-end devices                                                                       | G-005             | Student          | Must     | Initial load under 3 seconds on school Chromebooks                      |       |

## 7. Non-Functional Requirements

| NFR ID  | Category        | Requirement                                                              | Metric/Target                           | Priority | Validation                              | Notes |
| ------- | --------------- | ------------------------------------------------------------------------ | --------------------------------------- | -------- | --------------------------------------- | ----- |
| NFR-001 | Performance     | Page initial load time                                                   | <3 seconds on target devices            | Must     | Performance testing on Chromebook       |       |
| NFR-002 | Performance     | Graph update latency after coefficient change                            | <100ms                                  | Must     | Interaction timing measurement          |       |
| NFR-003 | Performance     | Smooth zoom/pan interactions                                             | 60fps target                            | Should   | Performance profiling                   |       |
| NFR-004 | Reliability     | Application functions without backend dependencies                       | 100% client-side operation              | Must     | Functional testing offline              |       |
| NFR-005 | Reliability     | Mathematical calculations accuracy                                       | Results match manual calculation        | Must     | Unit tests with known values            |       |
| NFR-006 | Accessibility   | WCAG 2.1 AA conformance                                                  | Pass all Level A and AA criteria        | Must     | Accessibility audit                     |       |
| NFR-007 | Accessibility   | Keyboard operability                                                     | All features keyboard accessible        | Must     | Keyboard-only testing                   |       |
| NFR-008 | Accessibility   | Color contrast                                                           | 4.5:1 for normal text, 3:1 for large    | Must     | Contrast ratio testing                  |       |
| NFR-009 | Compatibility   | Browser support                                                          | Chrome, Firefox, Safari, Edge (current) | Must     | Cross-browser testing                   |       |
| NFR-010 | Compatibility   | Device support                                                           | Desktop, tablet, mobile                 | Must     | Responsive design testing               |       |
| NFR-011 | Maintainability | Code test coverage                                                       | ≥80% unit test coverage                | Must     | Coverage reporting                      |       |
| NFR-012 | Maintainability | UI test coverage                                                         | Critical user flows covered             | Must     | UI test suite execution                 |       |
| NFR-013 | Maintainability | Code documentation                                                       | Key functions documented                | Should   | Code review                             |       |
| NFR-014 | Scalability     | Concurrent users                                                         | Unlimited (static hosting)              | Must     | Azure Static Web App architecture       |       |
| NFR-015 | Security        | No sensitive data handling                                               | Client-side only, no data transmission  | Must     | Architecture review                     |       |

## 8. Testing Requirements

### 8.1 Unit Testing

| TR ID   | Scope                        | Description                                                              | Coverage Target | Priority |
| ------- | ---------------------------- | ------------------------------------------------------------------------ | --------------- | -------- |
| TR-001  | Calculation functions        | Test vertex calculation (h = -b/2a, k = f(h))                            | 100%            | Must     |
| TR-002  | Calculation functions        | Test axis of symmetry calculation (x = -b/2a)                            | 100%            | Must     |
| TR-003  | Calculation functions        | Test y-intercept identification (0, c)                                   | 100%            | Must     |
| TR-004  | Calculation functions        | Test discriminant calculation (b² - 4ac)                                | 100%            | Must     |
| TR-005  | Calculation functions        | Test x-intercept calculation via quadratic formula                       | 100%            | Must     |
| TR-006  | Calculation functions        | Test direction determination (a > 0 vs a < 0)                            | 100%            | Must     |
| TR-007  | Input validation             | Test a=0 rejection with appropriate error                                | 100%            | Must     |
| TR-008  | Input validation             | Test non-numeric input rejection                                         | 100%            | Must     |
| TR-009  | Input validation             | Test edge cases (very large numbers, decimals, negatives)                | 100%            | Must     |
| TR-010  | Edge cases                   | Test discriminant = 0 (one real root)                                    | 100%            | Must     |
| TR-011  | Edge cases                   | Test discriminant < 0 (no real roots)                                    | 100%            | Must     |
| TR-012  | Edge cases                   | Test discriminant > 0 (two real roots)                                   | 100%            | Must     |
| TR-013  | Rendering logic              | Test equation string formatting                                          | 100%            | Should   |
| TR-014  | Rendering logic              | Test step-by-step solution generation                                    | 100%            | Must     |
| TR-015  | Overall coverage             | Aggregate code coverage across all modules                               | ≥80%           | Must     |

### 8.2 UI Testing

| TR ID   | Scope                        | Description                                                              | Validation Method      | Priority |
| ------- | ---------------------------- | ------------------------------------------------------------------------ | ---------------------- | -------- |
| TR-020  | Desktop validation           | Verify layout on desktop resolution (≥1024px)                           | Visual regression      | Must     |
| TR-021  | Tablet validation            | Verify layout on tablet resolution (768px-1023px)                        | Visual regression      | Must     |
| TR-022  | Mobile validation            | Verify layout on mobile resolution (<768px)                              | Visual regression      | Must     |
| TR-023  | Coefficient input flow       | Test typing and button increments update graph                           | E2E test               | Must     |
| TR-024  | Zoom/pan interaction         | Test zoom and pan gestures work correctly                                | E2E test               | Must     |
| TR-025  | Tab navigation               | Test clicking solution tabs displays correct content                     | E2E test               | Must     |
| TR-026  | Marker tooltips              | Test hovering/tapping markers shows coordinate tooltips                  | E2E test               | Should   |
| TR-027  | Keyboard navigation          | Test complete workflow using keyboard only                               | Manual + E2E           | Must     |
| TR-028  | Error state display          | Test invalid input shows appropriate error UI                            | E2E test               | Must     |
| TR-029  | Cross-browser                | Test on Chrome, Firefox, Safari, Edge                                    | Cross-browser test run | Must     |
| TR-030  | Responsive breakpoints       | Verify smooth transitions between device categories                      | Visual regression      | Should   |

### 8.3 Device Categories for Validation

| Category | Width Range     | Representative Devices                        | Priority |
| -------- | --------------- | --------------------------------------------- | -------- |
| Desktop  | ≥1024px        | Laptop, desktop monitors, Chromebooks         | Must     |
| Tablet   | 768px-1023px    | iPad, Android tablets                         | Must     |
| Mobile   | <768px          | iPhone, Android phones                        | Must     |

## 9. Dependencies

| Dependency                  | Type          | Criticality | Owner       | Risk                              | Mitigation                    |
| --------------------------- | ------------- | ----------- | ----------- | --------------------------------- | ----------------------------- |
| Modern browser availability | External      | High        | Schools     | Limited browser versions          | Target current major versions |
| Math rendering library      | Technical     | Medium      | Sarah Chen  | Selection impacts notation quality| Evaluate options early        |
| Graphing library            | Technical     | High        | Sarah Chen  | Selection impacts performance     | Evaluate options early        |
| Azure Static Web App        | Infrastructure| High        | Sarah Chen  | Deployment configuration          | Personal Azure subscription   |

## 10. Risks & Mitigations

| Risk ID | Description                         | Cause                        | Severity | Likelihood | Mitigation                               | Owner       | Status |
| ------- | ----------------------------------- | ---------------------------- | -------- | ---------- | ---------------------------------------- | ----------- | ------ |
| R-01    | Poor performance on school devices  | Complex rendering, libraries | High     | Medium     | Performance testing early; optimization  | Sarah Chen  | Open   |
| R-02    | Low teacher adoption                | Learning curve               | Medium   | Medium     | Teacher training; easy integration       | Dr. Torres  | Open   |
| R-03    | Accessibility gaps                  | Overlooked requirements      | High     | Low        | WCAG audit; accessibility-first approach | Sarah Chen  | Open   |
| R-04    | Library compatibility issues        | Untested combinations        | Medium   | Low        | Integrate libraries early; test together | Sarah Chen  | Open   |
| R-05    | Timeline pressure affects quality   | 9-day development window     | Medium   | Medium     | Prioritize Must requirements; defer enhancements | Sarah Chen | Open |

## 11. Privacy, Security & Compliance

### Data Classification

Quadec processes no personal data. All coefficient inputs and calculations are performed client-side and are not transmitted or stored.

### PII Handling

No PII is collected, processed, or stored.

### Regulatory / Compliance

| Regulation            | Applicability | Action                    | Owner       | Status   |
| --------------------- | ------------- | ------------------------- | ----------- | -------- |
| WCAG 2.1 AA           | Applicable    | Design and test for compliance | Sarah Chen | Planned |
| FERPA                 | Not applicable| No student data collected | N/A         | N/A      |
| COPPA                 | Not applicable| No data collection        | N/A         | N/A      |

## 12. Operational Considerations

| Aspect           | Requirement                                                    | Notes                              |
| ---------------- | -------------------------------------------------------------- | ---------------------------------- |
| Deployment       | Azure Static Web App                                           | Personal Azure subscription        |
| Rollback         | Redeploy previous version                                      | Standard Azure SWA rollback        |
| Monitoring       | Azure Static Web App analytics (optional)                      | Basic traffic metrics              |
| Support          | Teacher and developer feedback channel                         | Email or direct communication      |
| Capacity Planning| Static hosting scales automatically                            | No capacity concerns               |

## 13. Rollout & Launch Plan

### Phases / Milestones

| Phase       | Date              | Gate Criteria                         | Owner       |
| ----------- | ----------------- | ------------------------------------- | ----------- |
| Development | Feb 5-12, 2026    | All Must requirements functional      | Sarah Chen  |
| Testing     | Feb 12-13, 2026   | Critical issues resolved; tests pass  | Sarah Chen  |
| Launch      | Feb 14, 2026      | Live and accessible to students       | Sarah Chen  |

## 14. Open Questions

| Q ID | Question                                                | Owner       | Deadline   | Status   |
| ---- | ------------------------------------------------------- | ----------- | ---------- | -------- |
| —    | All questions resolved during BRD development           | —           | —          | Complete |

## 15. Changelog

| Version | Date       | Author      | Summary                                  | Type    |
| ------- | ---------- | ----------- | ---------------------------------------- | ------- |
| 0.1     | 2026-02-05 | PRD Builder | Initial draft from BRD                   | Create  |

## 16. References & Provenance

| Ref ID | Type       | Source                                      | Summary                              | Conflict Resolution |
| ------ | ---------- | ------------------------------------------- | ------------------------------------ | ------------------- |
| REF-01 | BRD        | docs/brds/quadec-brd.md                     | Business requirements source         | BRD takes precedence|
| REF-02 | Transcript | docs/transcripts/meeting-transcript.vtt     | Stakeholder meeting source           | BRD takes precedence|

## 17. Appendices

### Glossary

| Term                | Definition                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------- |
| Quadratic equation  | Polynomial equation of degree 2 in standard form: y = ax² + bx + c                          |
| Parabola            | U-shaped curve that is the graph of a quadratic equation                                     |
| Vertex              | Highest or lowest point of a parabola; calculated as (-b/2a, f(-b/2a))                      |
| Axis of symmetry    | Vertical line through the vertex; equation x = -b/2a                                         |
| Discriminant        | Value b² - 4ac that determines number of x-intercepts                                       |
| X-intercepts        | Points where parabola crosses x-axis (roots); found using quadratic formula                 |
| Y-intercept         | Point where parabola crosses y-axis; always at (0, c)                                        |
| Quadratic formula   | x = (-b ± √(b²-4ac)) / 2a; used to find x-intercepts                                        |
| SPA                 | Single Page Application; web app that loads a single HTML page and updates dynamically      |
| WCAG                | Web Content Accessibility Guidelines; standards for accessible web content                   |
| E2E                 | End-to-End testing; tests that simulate complete user workflows                              |

### Future Enhancements (Out of Scope for v1)

* Preset examples for common parabola types
* Shareable URLs with encoded coefficients
* Conversion between standard, vertex, and factored forms
* Dark mode
* Export graph as image
* Copy-to-clipboard functionality
* Teaching moment when a=0 (showing linear equation)

Generated 2026-02-05 by PRD Builder (mode: prd-builder)
<!-- markdown-table-prettify-ignore-end -->
