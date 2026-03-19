const http = require('http');

const paths = [
  '/',
  '/components',
  '/styles/hover',
  '/developing/react',
  '/stencil/diwa-components.css',
  '/stencil/diwa-components.esm.js',
];
const port = Number(process.env.HOSTING_SMOKE_PORT || '5000');

let pending = paths.length;
let failed = false;

for (const path of paths) {
  http
    .get({ host: '127.0.0.1', port, path }, (res) => {
      console.log(`${path} -> ${res.statusCode}`);
      if (res.statusCode >= 400) {
        failed = true;
      }
      res.resume();
      pending -= 1;
      if (pending === 0) {
        process.exit(failed ? 1 : 0);
      }
    })
    .on('error', (err) => {
      console.error(`${path} -> ERROR ${err.message}`);
      failed = true;
      pending -= 1;
      if (pending === 0) {
        process.exit(1);
      }
    });
}
