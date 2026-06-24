const { test } = require("@playwright/test");
const { createObjectCsvWriter } = require("csv-writer");

test("Export Hamro Patro Calendar Data", async ({ page }) => {
  const YEAR = "2083";
  const csvData = [];

  await page.goto("https://english.hamropatro.com/");

  // Select Year
  await page.locator("#selectYear").selectOption(YEAR);

  // Month Dropdown
  const monthDropdown = page.locator("#selectMonth");
  const months = await monthDropdown.locator("option").allTextContents();

  // Format YYYY-M-D -> DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
    const monthName = months[monthIndex].trim();

    console.log(`Processing ${monthName}`);

    await monthDropdown.selectOption({ index: monthIndex });

    await page.waitForTimeout(1000);

    const weekDays = (
      await page.locator("ul.days.clearfix li").allTextContents()
    ).map((day) => day.trim());

    const allCells = page.locator("ul.dates.clearfix li");
    const totalCells = await allCells.count();

    let firstValidIndex = -1;
    let lastValidIndex = -1;

    for (let i = 0; i < totalCells; i++) {
      const id = await allCells.nth(i).getAttribute("id");

      if (id && id !== "0") {
        if (firstValidIndex === -1) {
          firstValidIndex = i;
        }

        lastValidIndex = i;
      }
    }

    const firstDateCell = allCells.nth(firstValidIndex);
    const lastDateCell = allCells.nth(lastValidIndex);

    const validDates = page.locator('ul.dates.clearfix li:not([id="0"])');

    const totalDays = await validDates.count();

    // Get complete English dates from ID
    const startDateId = await firstDateCell.getAttribute("id");
    const endDateId = await lastDateCell.getAttribute("id");

    const startEnglishDate = formatDate(startDateId);
    const endEnglishDate = formatDate(endDateId);

    const startDay = weekDays[firstValidIndex % 7];
    const endDay = weekDays[lastValidIndex % 7];

    csvData.push({
      year: YEAR,
      month: monthName,
      totalDays,
      startDay,
      startEnglishDate,
      endDay,
      endEnglishDate,
    });

    console.log({
      year: YEAR,
      month: monthName,
      totalDays,
      startDay,
      startEnglishDate,
      endDay,
      endEnglishDate,
    });
  }

  const csvWriter = createObjectCsvWriter({
    path: `HamroPatro_${YEAR}.csv`,
    header: [
      { id: "year", title: "Year" },
      { id: "month", title: "Month" },
      { id: "totalDays", title: "Total Days" },
      { id: "startDay", title: "Start Day" },
      { id: "startEnglishDate", title: "Start English Date" },
      { id: "endDay", title: "End Day" },
      { id: "endEnglishDate", title: "End English Date" },
    ],
  });

  await csvWriter.writeRecords(csvData);

  console.log("CSV Generated Successfully");
});
