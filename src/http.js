async function headers(r) {
  r.headersOut['X-Server'] = 'NginxJS';
  r.headersOut['X-Message'] = 'I am NginxJS';
  r.headersOut['X-Date'] = new Date().toISOString();
  r.headersOut['X-Powered-By'] = `NginxJS (${njs.version})`;
}

function index(r) {
  headers(r)
  .then(() => {
    r.return(200, 'hello NginxJS World');
  })
  .catch(e => {
    r.log(e.toString());
    r.return(500, JSON.stringify(e.message));
  });
}

function hello(r) {
  headers(r)
  .then(() => {
    r.headersOut['Content-Type'] = 'application/json';
    r.return(200, JSON.stringify({
      hello: 'NginxJS World',
    }));
  })
  .catch(e => {
    r.log(e.toString());
    r.return(500, JSON.stringify(e.message));
  });
}

function fetch(r) {
  headers(r)
  .then(() => Promise.all([
    ngx.fetch('http://52.204.78.9').then(reply => reply.text()),
  ]))
  .then(body => {
    r.return(200, body);
  })
  .catch(e => {
    r.log(e.toString());
    r.return(500, JSON.stringify(e.message));
  });
}

async function generate_hs256_jwt(init_claims, key, valid) {
  let header = { typ: "JWT",  alg: "HS256" };
  let claims = Object.assign(init_claims, {
    exp: Math.floor(Date.now() / 1000) + valid,
  });
  let s = [header, claims].map(JSON.stringify)
  .map(v => Buffer.from(v).toString('base64url'))
  .join('.');
  let wc_key = await crypto.subtle.importKey('raw', key, {
    name: 'HMAC', hash: 'SHA-256',
  }, false, ['sign']);
  let sign = await crypto.subtle.sign({name: 'HMAC'}, wc_key, s);
  return s + '.' + Buffer.from(sign).toString('base64url');
}

function generateToken(r) {
  let claims = {
    iss: 'njs',
    sub: 'alice',
    ip: r.remoteAddress,
    host: r.headersIn['Host'],
  };
  let key = `${r.headersIn['Host']}(${process.env.HOSTNAME})`;
  return generate_hs256_jwt(claims, key, 600);
}

async function jwt(r) {
  headers(r)
  .then(() => generateToken(r))
  .then(token => {
    r.return(200, token);
  });
}

function summary(r) {
  headers(r)
  .then(async () => {
    r.headersOut['Content-Type'] = 'application/json';
    let token = await generateToken(r);
    r.return(200, JSON.stringify({
      nginx: process.env.NGINX_VERSION,
      njs: process.env.NJS_VERSION,
      hostname: process.env.HOSTNAME,
      host: r.headersIn.Host,
      userAgent: r.headersIn['User-Agent'],
      remoteAddress: r.remoteAddress,
      token,
    }, null, 2));
  });
}

export default { index, hello, fetch, jwt, summary };
