const path = require('path');

const { Polly } = require('@pollyjs/core');
const { setupPolly } = require('setup-polly-jest');
const PuppeteerAdapter = require('@pollyjs/adapter-puppeteer');
const FSPersister = require('@pollyjs/persister-fs');

Polly.register(PuppeteerAdapter);
Polly.register(FSPersister);

describe('app polly test', () => {
  // NOTE: `context.polly` is not accessible until the jasmine/jest hook `before`
  // is called. This means it's not accessible in the same tick here. Worth mentioning
  // since it trolled me while debugging.
  const context = setupPolly({
    adapters: ['puppeteer'],
    // NOTE: `page` is set by jest.config.js preset "jest-puppeteer"
    adapterOptions: { puppeteer: { page } },
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, '../__recordings__')
      }
    },
    matchRequestsBy: {
      headers: {
        exclude: ['user-agent']
      }
    }
  });

  beforeEach(async () => {
    jest.setTimeout(60000);

    await page.setRequestInterception(true);

    const { server } = context.polly;

    // server.host('http://localhost:3000', () => {
    //   server.get('/sockjs-node/*').intercept((_, res) => res.sendStatus(200));
    // });

    await page.goto('http://localhost:9000', { waitUntil: 'networkidle0' });
  });

  afterEach(async () => {
    await context.polly.flush();
  });

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

});
