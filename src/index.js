const { message } = require('./hello');

class NginxJS {
  index(res) {
    res.headersOut['Content-Type'] = "application/json";
    res.return(200, JSON.stringify({ message }));
  }
}

global.NginxJS = new NginxJS();
