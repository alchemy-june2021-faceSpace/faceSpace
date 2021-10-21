const app = require('./lib/app.js');
const pool = require('./lib/utils/pool.js');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
  // eslint-disable-next-line no-console
  console.log('Goodbye!');
  pool.end();
});
