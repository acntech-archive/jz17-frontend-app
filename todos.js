var axios = require('axios');

exports.fetch = function (config, callback) {

  const backendBaseUrl = process.env.BACKEND_BASE_URL || config.backend.baseUrl;
  axios.get(backendBaseUrl + '/todos', {
    timeout: 5000,
    headers: {
      'Connection': 'keep-alive'
    }
  })
  .then(function (response) {
    callback(null, response.data._embedded.todos);
  })
  .catch(function (error) {
    callback(error);
  });
}

exports.add = function (config, postData, callback) {
  const backendBaseUrl = process.env.BACKEND_BASE_URL || config.backend.baseUrl;

  axios.post(backendBaseUrl + '/todos', postData)
    .then(function (response) {
      callback(null, response)
  })
  .catch(function (error) {
    callback(error);
  });
}