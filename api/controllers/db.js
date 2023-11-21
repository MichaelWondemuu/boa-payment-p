const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '35.241.177.190',
  database: 'test_db',
  schema: 'public',
  password: 'Gbj!hfhe#rgnfjjA@76534bg',
  port: 5432,
});

module.exports = pool;
