import api from '../../api/index.js';

export const handler = async (event, context) => {
  return new Promise((resolve) => {
    const req = {
      url: event.rawUrl || '/',
      headers: event.headers,
      method: event.httpMethod,
      query: event.queryStringParameters || {}, // <<<<< important fix
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

    api(req, res); // call original Vercel-style API
  });
};
