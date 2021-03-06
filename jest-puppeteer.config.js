module.exports = {
  // browserContext: 'incognito',
  launch: {
    // headless: process.env.HEADLESS !== 'false',
    headless: false,
    devtools: true
  },
  server: {
    command: `RECORD_API=${process.env.RECORD_API} RECORD_TYPE=${process.env.RECORD_TYPE} node server.js`,
    port: 9000,
    launchTimeout: 10000,
    debug: true,
  },
}
