const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   post: 5452,
//   database: "node_postgres",
// });
// Підключення до бази
//  docker-compose up -d
// psql -h localhost -p 5432 -U postgres -d mydb
// password !23Awd

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "!23Awd",
  port: 5432,
});

module.exports = pool;
