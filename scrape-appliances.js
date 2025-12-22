const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const applianceToBrand = {
    "Central Air": "Kenmore",
    "Gas Furnace": "Kenmore",
    "Refrigerator": "Kenmore",
    "Dishwasher": "Kenmore",
    "Dryer": "Kenmore",
    "Washer": "Kenmore",
    "Freezer": "Kenmore",
    "Microwave": "Kenmore",
    "Oven": "Kenmore",
    "Range": "Kenmore",
    "Cooktop": "GE",
    "Washer Dryer Combo": "LG"
  };

  const result = [];
  const brandButton = '[data-testid="brandApplianceSymptomSelector_brandSelect"]';
  const applianceButton = '[data-testid="brandApplianceSymptomSelector_categoryApplianceSelect"]';

  for (const [appliance, brand] of Object.entries(applianceToBrand)) {
    console.log(`\n🔍 Fetching FULL issues for: ${appliance} (via ${brand})`);

    await page.goto('https://www.searshomeservices.com/symptom-center', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    try {
      // Select brand
      await page.waitForSelector(brandButton, { timeout: 10000 });
      await page.click(brandButton);
      await page.waitForTimeout(300);
      await page.locator('[role="listbox"] >> text=' + brand).first().click();
      await page.waitForTimeout(1000);

      // Select appliance
      await page.click(applianceButton);
      await page.waitForTimeout(500);
      await page.locator('[role="listbox"] >> text=' + appliance).first().click();
      await page.waitForTimeout(2000);

      // ✅ SCRAPE FULL SYMPTOM OBJECTS
      const issues = await page.$$eval(
        'a[data-testid^="brandApplianceSymptomSelector_symptom_"]',
        cards => cards.map(card => {
          const title = card.querySelector('h4')?.textContent.trim() || '';
          const description = card.querySelector('p')?.textContent.trim() || '';
          const url = card.getAttribute('href') || '';

          // Optional: normalize title (replace hyphens)
          const normalizedTitle = title.replace(/-/g, ' ');

          return {
            title: normalizedTitle,
            description,
            url
          };
        })
      );

      result.push({ appliance, issues });

    } catch (err) {
      console.warn(`⚠️ Failed for ${appliance}:`, err.message);
      result.push({ appliance, issues: [] });
    }
  }

  // Save full data
  const fs = require('fs');
  fs.writeFileSync('appliance_issues_full.json', JSON.stringify(result, null, 2));
  console.log('\n🎉 Done! Full symptom data (title + description + URL) saved.');

  await browser.close();
})();