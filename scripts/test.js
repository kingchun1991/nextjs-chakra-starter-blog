var CLAP_URL = 'aaa';
var eSTM_URL = 'https://lgaeswvmcdev11a:9400';

var request = require('request');
var options = {
  method: 'GET',
  url: `${eSTM_URL}/_security/role`,
  headers: {
    Authorization: 'Basic Y2xhcGFkbWluOlBXRE5QUmQxMg==',
  },
};
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  const responseBody = JSON.parse(response.body);
  for (let [i, v] of Object.entries(responseBody)) {
    // Your code here
    if (i.includes('user') || i.includes('admin')) {
      console.log(`key: ${i}, value: ${v}`);
    }
    if (!v.metadata || v.metadata._reserved !== true) {
      console.log(`key: ${i}, value: ${v}`);
      // Your code here
    }
  }
});
