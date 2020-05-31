const talkback = require('talkback');

const host = 'https://czqk28jt.apicdn.sanity.io';

describe('app', () => {
  // beforeAll(async () => {})


  beforeEach(async () => {

    // page.on('request', (req)=>{
    //   console.log('REQQQQQ---', req)
    // })

    const requestHandler = await talkback.requestHandler({
      host: host,
      path: __dirname + "/tapes.reqHand",
      record: process.env.RECORD_API === "true" ? talkback.Options.RecordMode.NEW : talkback.Options.RecordMode.DISABLED,
      debug: true,
      name: "Test Request Handler"
    })

    // await jestPuppeteer.resetPage();
    await page.setRequestInterception(true)
    page.on("request", async interceptedRequest => {
      console.log('FUQ-', interceptedRequest.url())
      if (interceptedRequest.url().startsWith(host)) {
        // let body = Buffer.alloc(0)
        // if (interceptedRequest.postData()) {
        //   body = Buffer.from(interceptedRequest.postData())
        // }

        const talkbackRequest = {
          url: interceptedRequest.url().substr(host.length),
          method: interceptedRequest.method(),
          headers: interceptedRequest.headers(),
          // body: body
        }
        console.log('About to WAIT---', talkbackRequest)
        // const r = await requestHandler.handle(talkbackRequest)
        // console.log('WAITED---', r)
        if (interceptedRequest.method() === 'OPTIONS') {
          interceptedRequest.continue()
        } else {
          interceptedRequest.respond({
            status: 200,
            contentType: "application/json; charset=utf-8",
            // The mocked data you want to return
            body: JSON.stringify({ foo: "bar" })
          })
        }
        // interceptedRequest.continue()
        //   .then(r => {
        //     console.log('RES---', r)
        //     interceptedRequest.respond(r)
        //   })
        //   .catch(error => {
        //     console.log("Error handling talkback request", error)
        //     interceptedRequest.abort()
        //   })
      } else {
        interceptedRequest.continue()
      }
    })

    await page.goto('http://localhost:9000', {waitUntil: "networkidle2"})
  })

  it('should display a title', async () => {
    await page.waitForSelector('p');
    await expect(page).toMatch('Test jest-puppeteer-nock with urql')
  }, 5000)

  // it('should click first link and be on that links page', async () => {
  //   await page.waitForSelector('[data-testid="list"]');
  //   const [response] = await Promise.all([
  //     page.waitForSelector('h1'),
  //     page.click('[data-testid="link"] a'),
  //   ]);
  //   await expect(page).toMatch('This is the main page for Trademarks')
  // }, 5000)
})
