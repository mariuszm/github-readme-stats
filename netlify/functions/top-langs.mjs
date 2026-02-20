// top-langs.mjs
import api from '../../api/index.js'; // path to the original Vercel repo api/index.js

export const handler = async (event, context) => {
  return new Promise((resolve) => {
    // Build a Vercel-style req object
    const req = {
      url: event.rawUrl || '/',
      method: event.httpMethod,
      headers: {
        ...event.headers,
        accept: 'image/svg+xml', // ensures SVG card output
      },
      query: event.queryStringParameters || {}, // all query params
    };

    // Build a Vercel-style res object with polyfills
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
      api(req, res); // call the original API
    } catch (err) {
      console.error('Netlify function error:', err);
      resolve({
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Internal Server Error',
      });
    }
  });
};
