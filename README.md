This repository contains the technical homework submission for the Part-time QA Engineer position. 
- **Repository**: [ranevisa/task_automationtest](https://github.com/ranevisa/task_automationtest)
- **Tech Stack**: Playwright (TypeScript), Node.js, GitHub Actions

---

## Task 1 - Automated API Testing Pipeline

### 1. How to Run Tests Locally

#### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

#### Setup & Execution Steps
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ranevisa/task_automationtest.git](https://github.com/ranevisa/task_automationtest.git)
   cd task_automationtest
`
Install task_automation:
1. Install Dependencies = npm install
2. Set up env = BASE_URL=[https://reqres.in/api](https://reqres.in/api)
3. Run the API Test = npm test
4. View HTML Test Report = npx playwright show-report

---
How to Run Tests Using CI/CD
The automated test suite runs via GitHub Actions on every push or pull_request to the main or master branch.

Pipeline Features:
- Automatically installs Node.js dependencies and executes Playwright API tests.
- Passes environment variables securely (BASE_URL).
- Generates and uploads the HTML Test Report as a workflow artifact upon completion.

Viewing CI Test Reports:
1. Go to the Actions tab on github.com/ranevisa/task_automationtest.
2. Click on the latest workflow run.
3. Scroll down to the Artifacts section and download html-test-report.

--- 
3. Test Strategy
a. Happy Path Coverage:
- POST /users: Verifies successful user creation (returns status 201 and validates response payload).
- GET /users/{id}: Verifies fetching existing user details (returns status 200 with correct structure).

b. Negative Scenarios:
- GET /users/{id} with non-existent ID (asserts 404 Not Found).
- POST /users with empty body / missing required fields (asserts 400 Bad Request or validation status).
- Accessing invalid endpoint path (asserts 404 Not Found).

Clean and Maintainable Code: Test scripts are organized by scenario (minimal have positive, negative, edge). 
Testing Methodology: Carried out in a structured and documented manner.

Assumptions & Limitations
- Public Mock API: Tests utilize https://reqres.in as the base API server.
- Data Persistence: Since mock endpoints do not persist POST requests indefinitely, dynamic response structure validation is prioritized over database persistence.
- Rate Limits: Public APIs may be subject to occasional external latency or throttling in shared CI environments.
- Any Assumption: Do the stress test and performance with unique case and users from a wide variety of backgrounds who use the app. Because everyone is unique. 

**Additional Question: Scaling Automation (20 to 1,000+ Tests)**
- To keep execution time, reliability, and maintenance effort under control when scaling up to over 1,000 tests, I would implement the following strategies:
1. Parallelization & Sharding:
Split and execute Playwright tests concurrently within the CI/CD pipeline using sharding techniques, allowing time-consuming tests to complete in just a few minutes.

2. Test Data Management & Isolation:
Set up dynamic test data beforehand and clean it up once execution is complete.

3. API Abstraction Layer (Client Pattern):
Encapsulate all endpoints within separate API classes; this ensures that if a URL or header changes, updates only need to be made in a single file.

4. Test Categorization & Selective Execution:
Tag tests based on their function—such as `@smoke` for quick checks on new code (PRs) and `@regression` for automated, comprehensive testing.
