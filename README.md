# Playwright Cucumber TypeScript Framework

A scalable, enterprise-grade test automation framework built using a **Hybrid Framework Model**. It combines Behaviour-Driven Development (BDD) via Cucumber with high-performance browser automation using Playwright.

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Engine | Playwright | Browser automation and execution |
| BDD Layer | Cucumber (Gherkin) | Readable, stakeholder-friendly scenarios |
| Language | TypeScript | Type-safe scripting and IDE support |
| Environment | Node.js (v20.17.0) | Runtime environment |

---

## 📁 Project Structure

```
Main Folder
├── .vscode/
│   └── settings.json           # Configures IDE support for Cucumber steps
│
├── data/
│   ├── inputFiles/             # Files used as test input
│   └── testData/
│       └── dynamicData.ts      # Tag-to-Data mapping for all test scenarios
│
├── features/                   # Cucumber feature files (.feature)
│
├── src/
│   ├── support/
│   │   ├── constants/
│   │   │   └── BrowserConstants.ts
│   │   ├── hooks/
│   │   │   └── hooks.ts        # Manages test lifecycle events (Before/After)
│   │   ├── logger/
│   │   │   └── Log.ts
│   │   ├── manager/
│   │   │   └── Browser.ts
│   │   ├── reporter/
│   │   │   ├── CucumberReporter.ts
│   │   │   └── HTMLReporter.ts
│   │   └── utils/              # Utility helpers
│   │       ├── CLIUtils.ts
│   │       ├── DateUtil.ts
│   │       ├── EnvUtil.ts
│   │       ├── PDFUtil.ts
│   │       ├── StringUtil.ts
│   │       └── XMLParserUtil.ts
│   └── web/
│       ├── commonFunctions/
│       │   ├── buildLocator.ts         # Dynamic locator injection logic
│       │   ├── commonFunctionAllPages.ts
│       │   └── getData.ts
│       ├── pages/
│       │   └── webPages.ts
│       └── steps/
│           └── stepsFiles.ts
│
├── test-results/               # All generated test results and reports
├── .env.envName                # Environment variable configuration files
├── cucumber.js                 # Cucumber configuration
├── package-lock.json
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Configuration

The framework uses `.env` files to control test execution across different environments (QA, UAT, Production-like) without modifying core test scripts.

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Base application URL all tests run against |
| `BROWSER` | Browser to run tests in (e.g., `chromium`, `firefox`) |
| `HEADLESS` | `true` for headless mode, `false` for visible browser UI |
| `TEST_TIMEOUT` | Maximum execution time per test (milliseconds) |
| `USERNAME` | Login credential used during test execution |
| `RECORD_VIDEO` | Enable/disable video recording of test runs |
| `RETRIES` | Number of times a failed test retries before being marked failed |
| `LOGIN` | Login method: `EMAIL` (username/password) or `MICROSOFT` (service account + MFA bypass) |

### Environment Files

Create separate environment files for each environment(Dev, Test, QA) and respective npm scripts for each environment file 

---

## 🗂️ Data Management — `dynamicData.ts`

> ⚠️ **This is the most critical configuration file in the framework.**

The framework uses a **Tag-to-Data mapping system**. Each Cucumber scenario tag maps directly to a top-level key in `dynamicData.ts`. At runtime, the framework reads the scenario's tag, finds the matching key, and injects the corresponding data object into the test context automatically.

### Rules

- The **top-level key** in `testData` **must exactly match** the tag name used on the scenario in the feature file.
- Nested key-value pairs provide the specific data required to run that test.
- Update the nested values as needed before each run — do not change the top-level keys unless you also update the matching feature file tag.

### Example

**`data/testData/dynamicData.ts`**
```typescript
export const testData = {
  "addNewClient": {
    "Year": "2022",
    "Client": "New Client Test",
    "Business_Unit": "ICT"
  }
};
```

**Matching feature file**
```gherkin
Feature: Client Management

  @addNewClient
  Scenario: Add a new client
    Given I am on the client management page
    When I add a new client with the required details
    Then the client should appear in the list
```

The tag `@addNewClient` on the scenario tells the framework to inject the `addNewClient` data object automatically when this scenario runs.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.17.0
- npm (bundled with Node.js)

### Installation

```bash
git clone https://github.com/rohithpuppala96-png/playwright-cucumber-typescript-framework.git
cd playwright-cucumber-typescript-framework
npm install
npx playwright install
```

---

## ▶️ Running Tests

> **Every run command requires a tag.** Running without a tag is not supported.

### Local Environment

```bash
npm run test-QALocal "@regression"
npm run test-QALocal "@yourScenarioTag"
```

### Cloud Environment

```bash
npm run test-QATest "@regression"
npm run test-QATest "@addProducts"
```

### Tag Behaviour

| Tag type | What runs |
|----------|-----------|
| `@regression` | All feature files in the suite |
| Feature-level tag | All scenarios within that feature |
| Scenario-level tag | Only that specific scenario |

---

## 📊 Reporting

Reports are **not** generated automatically after a test run. You must run the report command separately.

### Generate Reports

**Local:**
```bash
npm run test-QALocal-report
```

**Cloud:**
```bash
npm run test-QATest-report
```

### Report Location

All test results and reports are saved to the **`test-results/`** folder.

---

## 🐛 Playwright Debug Mode

To run tests with the Playwright debugger enabled:

**PowerShell (Windows):**
```powershell
$env:PWDEBUG=1
npm run test-jpLocal "@yourTag"
```

**Bash / macOS:**
```bash
export PWDEBUG=1 npm run test-jpLocal "@yourTag"
```

---

## 🔁 Running the Full Regression Suite

### Step 1 — Configure your environment file

Set the correct `BASE_URL` in either `.envQALocal` or `.envQATest`, along with your `USERNAME`, `PASSWORD`, `BROWSER`, `HEADLESS`, and `LOGIN` method.

### Step 2 — Update `dynamicData.ts`

Ensure all test data values in `data/testData/dynamicData.ts` are up to date for the environment you are targeting. Top-level keys must match scenario tags exactly.

### Step 3 — Run the suite

```bash
# Local
npm run test-QALocal "@regression"

# Cloud
npm run test-QATest "@regression"
```

### Step 4 — Generate the report

```bash
# Local
npm run test-QALocal-report

# Cloud
npm run test-QATest-report
```

Reports will be available in the `test-results/` folder.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request
