

const { Pool } = require('pg');
const PaymentService = require('./service/payment-service');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test_db',
    schema:'public',
    password: 'fgcjh',
    port: 5432,
  });
class PaymentController {
    static async getBOAtoken(req, res) {
        try {
            // Get the latest token from the database
            const getOld = 'SELECT * FROM tokens ORDER BY date DESC LIMIT 1';
            const oldToken = await pool.query(getOld);
        
            // Prepare the request body for refreshing the token
            const tokenBody = {
              client_secret: req.body.client_secret,
              client_id: 'client_garri',
              grant_type: 'refresh_token',
              refresh_token: oldToken.rows[0].refresh_token,
            };
            // Get a new token using the refresh token
            const token = await PaymentService.getToken(tokenBody);
        
            if (token) {
              const { access_token, refresh_token, token_type, expires_in } = token;
              const date = new Date();
        
              // Update the token in the database
              const updateQuery = `
                UPDATE tokens 
                SET access_token = $1, refresh_token = $2, date = $3, expires_in = $5 
                WHERE token_type = $4`;
              const updateValues = [access_token, refresh_token, date, token_type, expires_in];
        
              const updateResult = await pool.query(updateQuery, updateValues);
        
              if (updateResult.rowCount === 0) {
                // If the update didn't affect any rows, insert a new token
                const insertQuery = `
                  INSERT INTO tokens (access_token, refresh_token, date, token_type, expires_in) 
                  VALUES ($1, $2, $3, $4, $5) 
                  RETURNING *`;
                const insertResult = await pool.query(insertQuery, updateValues);
                res.status(201).json(insertResult.rows);
              } else {
                console.log(updateResult);
                res.status(201).json(token);
              }
            } else {
              res.status(500).json({ error: 'Failed to obtain a token' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
          }
    }
    static async setBOAtransfer(req, res) {
        // const transferHeaders = {
        //     'x-api-key': 'MICKY-s89sd7d81-9ow9-6gf6-5gf6-f3w-238',
        //     'authorization': token.access_token
        //   };  //will remove
        const result =await PaymentService.makeTransfer(transferHeaders);
        res.status(201).json(result);
      } 
      
      static async getBOAenquiry(req, res) {
    const result =await PaymentService.getEnquiry(req.query.account);
    res.status(201).json(result);
  }
  }
  module.exports = PaymentController;
