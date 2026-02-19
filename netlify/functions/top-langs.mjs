import api from '../../api/index.js';

export const handler = async (event, context) => {
  return new Promise((resolve) => {
    // simulate req/res like Vercel
    const req = {
      url: event.rawUrl || '/',
      headers: event.headers,
      method: event.httpMethod,
      query: event.queryStringParameters || {},
    };

    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: (k, v) => { res.headers[k] = v; },
      send: (body) => { res.body = body; resolve(res); },
      json: (obj) => { res.body = JSON.stringify(obj); resolve(res); },
      end: (body) => { res.body = body; resolve(res); },
    };

    try {
      api(req, res); // call original Vercel-style API
    } catch (err) {
      console.error(err);
      resolve({
        statusCode: 500,
        body: 'Internal Server Error',
      });
    }
  });
};
