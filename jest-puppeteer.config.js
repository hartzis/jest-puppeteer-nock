module.exports = {
  browserContext: 'incognito',
  launch: {
    headless: process.env.HEADLESS !== 'false',
    // devtools: true
  },
  server: {
    command: `node server.js`,
    port: 9000,
    launchTimeout: 10000,
    debug: true,
  },
}
