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

3. Test Strategy
Happy Path Coverage:
- POST /users: Verifies successful user creation (returns status 201 and validates response payload).
- GET /users/{id}: Verifies fetching existing user details (returns status 200 with correct structure).

Negative Scenarios:
- GET /users/{id} with non-existent ID (asserts 404 Not Found).
- POST /users with empty body / missing required fields (asserts 400 Bad Request or validation status).
- Accessing invalid endpoint path (asserts 404 Not Found).

Design Principles:
- Clean & Maintainable Code: Kept test scripts modular and clean.
- Test Autonomy: Each test scenario is independent and does not rely on state left by previous tests.

4. Assumptions & Limitations
- Public Mock API: Tests utilize https://reqres.in as the base API server.
- Data Persistence: Since mock endpoints do not persist POST requests indefinitely, dynamic response structure validation is prioritized over database persistence.
- Rate Limits: Public APIs may be subject to occasional external latency or throttling in shared CI environments.

5. Additional Question: Scaling Automation (20 to 1,000+ Tests)
- To keep execution time, reliability, and maintenance effort manageable when scaling to 1,000+ tests, I would implement the following strategy:
1. Parallelization & Sharding:
 - Utilize Playwright's parallel execution and test sharding across multiple CI workers to execute tests concurrently, keeping total runtime under a few minutes.
2. Test Data Management & Isolation:
 - Avoid test interdependencies. Use factory/fixture patterns to generate isolated dynamic test data per test run and clean up after execution.
3. API Abstraction Layer (Client Pattern):
 - Encapsulate endpoint calls into dedicated API client classes. Endpoint URL or header changes will only require updating a single class rather than thousands of test files.
4. Test Categorization & Selective Execution:
 - Tag tests (e.g., @smoke, @regression, @sanity). Run fast @smoke suites on every PR, while reserving full @regression suites for scheduled nightly builds.
