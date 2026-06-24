# Hamro Patro Calendar Data Export Automation

## Description

This Playwright automation script extracts calendar information from the Hamro Patro English Calendar and exports the results into a CSV file.

The script:

* Selects a Nepali year
* Iterates through all Nepali months
* Calculates the total number of days in each month
* Identifies the first day and last day of each month
* Extracts the corresponding English start and end dates
* Generates a CSV report

## Prerequisites

* Node.js
* Playwright
* csv-writer

## Installation

Install dependencies:

```bash
npm install
npm install @playwright/test
npm install csv-writer
npx playwright install
```

## Configuration

Update the year in the script:

```javascript
const YEAR = "2083";
```

Change it to any Nepali year as needed.

## Run the Script

```bash
npx playwright test
```

Or run the specific test file:

```bash
npx playwright test <filename>
```

## Output

A CSV file will be generated:

```text
HamroPatro_2083.csv
```

Sample Output:

| Year | Month    | Total Days | Start Day | Start English Date | End Day  | End English Date |
| ---- | -------- | ---------- | --------- | ------------------ | -------- | ---------------- |
| 2083 | Baishakh | 31         | Tuesday   | 14-04-2026         | Thursday | 14-05-2026       |
| 2083 | Jestha   | 31         | Friday    | 15-05-2026         | Sunday   | 14-06-2026       |

## Technologies Used

* Playwright
* JavaScript
* Node.js
* csv-writer


