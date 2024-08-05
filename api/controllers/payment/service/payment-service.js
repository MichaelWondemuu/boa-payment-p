const axios = require('axios');
const https = require('https'); 
const pool = require('../../db');
const tokenUrl = 'https://vertual-ip/apiMicky/oauth2/token';
const transferUrl = 'https:///vertual-ip/apiMicky/FundTransfer';
const enquiryUrl = "https:///vertual-ip/apiMicky/Accountenquiry"


const transferBody = {
  "Currency":"ETB",
  "Amount":"100",
  "TransactionType":"AC",
  "DebitAccount":"50832578",
  "CreditAccount":"98245243"
};

class PaymentService {
  
static async getLatestToken(){
  // Get the latest token from the database
  const getOld = 'SELECT * FROM tokens ORDER BY date DESC LIMIT 1';
  const oldToken = await pool.query(getOld);
  return  oldToken.rows[0];
}


// Function to get the access token
static async  getToken(tokenBody) {
    const tokenResponse = await axios.post(tokenUrl, tokenBody, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });

    if (tokenResponse.status === 200) {
      console.log(tokenResponse)
      console.log('tokenResponse.data',tokenResponse.data)
      return tokenResponse.data;
    } else {
      console.error('Token Request Failed:');
      console.error(`Response Data: ${JSON.stringify(tokenResponse.data, null, 2)}`);
      return `Status Code: ${tokenResponse.status}`;
    }
  //   return {
  //     "access_token": "LZRr5AWxQB5VKyvPD9cqNZW54gOy7Yh6",
  //     "refresh_token": "3rhV80dXkL7Ig2MKlA8YrV3ZEiBAUMJP",
  //     "date": "2023-11-08T16:49:55.000Z",
  //     "token_type": "bearer2",
  //     "expires_in": "7200"
  // };
  
}

// Function to make the transfer request
static async makeTransfer(transferHeaders) {
  try {
    const token = await this.getLatestToken();
    const transferHeaders = {
      'x-api-key': 'MICKY-s89sd7d81-9ow9-6gf6-5gf6-f3w-238',
      'authorization': token.access_token
    }; 
    const transferResponse = await axios.post(transferUrl, transferBody, { headers: transferHeaders, httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
    return transferResponse;
  } catch (error) {
    console.error('Error in makeTransfer:', error.message);
    console.error('Error stack trace:', error.stack);
    return error;
  }
} 
 
static async  getEnquiry(account) {
  try{
    const token = await this.getLatestToken();
    const enquiryHeaders = {
      'x-api-key': 'MICKY-s89sd7d81-9ow9-6gf6-5gf6-f3w-238',
      'authorization': token.access_token
    };    
    const enquiryBody = {
      "Account":account
      }
      console.log(enquiryHeaders)
      console.log(enquiryBody)
    const enquiryResponse = await axios.post(enquiryUrl,enquiryBody,  { headers: enquiryHeaders });
      // console.log('Token Response:');
    // console.log(`Status Code: ${response.status}`);
    // console.log('Response Data:', JSON.stringify(response, null, 2));
    return enquiryResponse.data;
  }catch(error){
    return error;
  }
  
}
}
module.exports = PaymentService;
