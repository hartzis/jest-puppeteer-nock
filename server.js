const express = require('express');
const path = require('path');

// const { createProxyMiddleware } = require('http-proxy-middleware');
const talkback = require("talkback");

const GRAPHQL_URL = 'https://czqk28jt.apicdn.sanity.io/v1/graphql/prod_bk/default'

const record = process.env.RECORD_API === 'true'
  ? talkback.Options.RecordMode.NEW
  : talkback.Options.RecordMode.DISABLED

const opts = {
  host: GRAPHQL_URL,
  record,
  port: 5544
};

const server = talkback(opts);
server.start(() => console.log('Talkback Started'));

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// // graphQL API proxy
// app.use('/api',
//   createProxyMiddleware({
//     target: GRAPHQL_URL,
//     changeOrigin: true,
//     pathRewrite: {'^/api' : ''}
//   })
// );

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
