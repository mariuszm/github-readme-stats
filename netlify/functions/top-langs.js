import handler from "../../api/top-langs.js";

export default async (req) => {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams);

  let responseBody = "";
  let responseHeaders = { "Content-Type": "image/svg+xml" };
  let responseStatus = 200;

  const fakeReq = {
    query,
    headers: Object.fromEntries(req.headers),
  };

  const fakeRes = {
    setHeader: (k, v) => { responseHeaders[k] = v; },
    send: (body) => { responseBody = body; },
    status: (code) => { responseStatus = code; return fakeRes; },
  };

  await handler(fakeReq, fakeRes);

  return new Response(responseBody, {
    status: responseStatus,
    headers: responseHeaders,
  });
};

export const config = { path: "/api/top-langs" };
