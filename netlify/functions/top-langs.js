const { createServer } = require('http');
const { parse } = require('url');
const api = require('../../api/index'); // adjust relative path

exports.handler = async (event, context) => {
  return new Promise((resolve) => {
    const req = {
      url: event.rawUrl || '/',
      headers: event.headers,
      method: event.httpMethod,
    };
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: (k, v) => { res.headers[k] = v; },
      end: (body) => {
        res.body = body;
        resolve(res);
      },
    };

    api(req, res);
  });
};
