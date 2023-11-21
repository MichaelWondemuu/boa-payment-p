const axios = require('axios');
require('dotenv').config();
const instance = axios.create({
  baseURL: 'https://api.afromessage.com/api',
  timeout: 5000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiRTdxdVl0czNOQU9ZR1pLY3dQY2EwbGc3ZnV2SWdmY3giLCJleHAiOjE4NTE3NDc1MDIsImlhdCI6MTY5Mzg5NDcwMiwianRpIjoiNzlhMjhlZjctYjM5Mi00MTA3LThhZWYtNjQ5Y2FiZWU4NTJmIn0.NaNFdXr1ypmMjFxlHh8gHgFxSTz6ilLeTL5zhUrATEU',
  },
});
const SmsNotification = {

  sendOtpCode: async () => {
    console.log('Inside sendOtpCode');
    const  phoneNumber  = '+251921636677';
    const sender = 'GARRI';
    const callback = 'https://api.garri.ng/api/v1/otp/verify';
    const identifierId = 'e80ad9d8-adf3-463f-80f4-7c4b39f7f164';
    const codeLength = 6;
    const codeType = 0; // 0 for number only codes. 1 for alphabet only codes and 2 for alphanumeric codes.
    const timeToLive = 600 * 600; // in seconds
    const postMessage = 'is Your BOA payment  conformation code.';
    // const preMessage = 'Your login verification code is ';
    // const spacesBefore = 1;
    const spacesAfter = 2;
    const response = await instance.get(`/challenge`, {
      params: {
        from: identifierId,
        sender: sender,
        to: phoneNumber,
        ps: postMessage,
        sa: spacesAfter,
        ttl: timeToLive,
        len: codeLength,
        t: codeType,
        callback: callback,
      },
    });
    console.log('last sendOtpCode');
    console.log('response', response.data.response);
    // console.log('response', response.data);
    return response.data.response;
  },
  verifyOtpCode: async (req,res) => {
    // https://api.afromessage.com/api/verify?to={YOUR_RECIPIENT}&vc={VERIFICATION_ID}&code={CODE_TO_VERIFY}
    console.log(req.query)
    const { phoneNumber, otpCode } = req.query;
    const verificationId = 'e85f4d8a-d5f9-42da-9a6f-798415c4ebeb';
    const response = await instance.get(`/verify`, {
      params: {
        to: phoneNumber,
        vc: verificationId,
        co: otpCode,
      },
    });
    console.log('response', response);
    return response.data.response;
  },
  sendMessage: async (payload) => {
    //https://api.afromessage.com/api/send?from=YOUR_IDENTIFIER_ID&sender=YOUR_SENDER_NAME&to=YOUR_RECIPIENT&message=YOUR_MESSAGE&callback=YOUR_CALLBACK
    const { phoneNumber, message } = payload;
    const sender = 'GARRI';
    const callback = 'https://api.garri.ng/api/v1/otp/verify';
    const identifierId = 'e80ad9d8-adf3-463f-80f4-7c4b39f7f164';
    const response = await instance.post(`/send`, {
      params: {
        from: identifierId,
        sender: sender,
        to: phoneNumber,
        message: message,
        callback: callback,
      },
    });
    console.log('response', response.data);
    return response.data;
  },
  sendBulkMessage: async (payload) => {
    // POST https://api.afromessage.com/api/bulk_send
    const { phoneNumbers, message } = payload;
    const sender = 'GARRI';
    const callback = 'https://api.garri.ng/api/v1/otp/verify';
    const identifierId = 'e80ad9d8-adf3-463f-80f4-7c4b39f7f164';
    const response = await instance.post(`/bulk_send`, {
      params: {
        from: identifierId,
        sender: sender,
        to: phoneNumbers,
        message: message,
        callback: callback,
      },
    });
    // console.log('response', response.data);
    return response.data;
  },
};
module.exports = SmsNotification;
// SmsNotification.sendOtpCode({ phoneNumber: '+251986099831' })
//   .then((res) => {
//     console.log('res', res);
//   })
//   .catch((err) => {
//     console.log('err', err);
//   });
// SmsNotification.verifyOtpCode({
//   phoneNumber: '+251918577461',
//   otpCode: '994326',
// });
// SmsNotification.sendMessage({
//   phoneNumber: '+251918577461',
//   message: 'Hello from Garri Logistics',
// });

// const phones =['+251921636677', '+251918577461'];
// SmsNotification.sendBulkMessage({
//   phoneNumbers: phones,
//   message: 'BULK TEST, Hello from Garri Logistics',
// });