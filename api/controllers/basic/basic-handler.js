const pool = require('../db');

class BasicController {
  static async dbHealth(req, res) {
    try {
      await pool.query('SELECT NOW()');
      res.apiResponse({ status: 'Database connection is healthy' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database connection error' });
    }
  }
  static async getToken(req, res) {
    try {
      const query = 'SELECT * FROM tokens';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve tokens' });
    }
  }
  static async setToken(req, res) {
    const { access_token, refresh_token,bearer } = req.query;
  try {
    const date =new Date();
    const query = 'INSERT INTO tokens (access_token, refresh_token,bearer,date) VALUES ($1, $2,$3) RETURNING *';
    const values = [access_token, refresh_token,bearer,date];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a token' });
  }
  }
}

module.exports = BasicController;
