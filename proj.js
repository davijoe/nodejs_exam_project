const crypto = require('crypto');
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log(jwtSecret);
// Example output: 'f3b0a62d4e8a7b6db484fcb51fdaab02467db93fdd03bd4ba5c8e6edcc967e9b'

