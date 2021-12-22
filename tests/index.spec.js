const { test, expect } = require('@playwright/test');

const AboutLink = 'a:has-text("About")';
const HomeLink = 'a:has-text("Home")'

test.describe("Index: ", () => {
	test.beforeEach( async ({ page }) => {
		await page.goto("https://heros-weather-app.herokuapp.com/");
		// await page.goto("http://localhost:3000");

	})
	test("Link About redirect to About page", async({ page }) => {
		await page.click(AboutLink);
		await expect(page).toHaveURL('https://heros-weather-app.herokuapp.com/about');
		// await expect(page).toHaveURL('http://localhost:3000/about');

	});
	test("Show Lisboa title after filling the form", async({ page }) => {
		await page.fill('input', 'Lisboa');
		await page.click('button');
		await expect(page.locator('#info-place')).toHaveText("Lisbon, Lisboa, Portugal");
	})
	test("Display error if doesn't exists query data", async({ page }) => {
		await page.click('button');
		await expect(page.locator('#info-error')).toHaveText("There is no address in the query");
	})
	test("display error if the query data is invalid", async({ page }) => {
		await page.fill('input', '!');
		await page.click('button');
		await expect(page.locator('#info-error')).toHaveText("No location found. Please, perform another search");
	})
})

test.describe("About: ", () => {
	test("Link Home redirect to Homepage", async({ page }) => {
		await page.goto('https://heros-weather-app.herokuapp.com/about');
		await page.click(HomeLink);
		await expect(page).toHaveURL("https://heros-weather-app.herokuapp.com/");
	})
})