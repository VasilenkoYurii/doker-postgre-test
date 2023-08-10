const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  post: 5452,
  database: "node_postgres",
});

module.exports = pool;
