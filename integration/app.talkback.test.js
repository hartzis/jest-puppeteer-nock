describe('app', () => {

  beforeEach(async () => {
    await page.goto('http://localhost:9000')
  })

  it('should display a title', async () => {
    await page.waitForSelector('p');
    await expect(page).toMatch('Test jest-puppeteer-nock with urql')
  }, 5000)

  it('should click first link and be on that links page', async () => {
    await page.waitForSelector('[data-testid="list"]');
    const [response] = await Promise.all([
      page.waitForSelector('h1'),
      page.click('[data-testid="link"] a'),
    ]);
    await expect(page).toMatch('This is the main page for Trademarks')
  }, 5000)
})
