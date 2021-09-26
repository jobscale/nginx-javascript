const { hello } = require('./hello');

class NginxJS {
  index(njs) {
    this.setHeaders(njs);
    njs.return(200, JSON.stringify({ message: hello.say(), njs }));
  }

  setHeaders(njs) {
    njs.headersOut['Content-Type'] = "application/json";
  }
}

global.NginxJS = {
  index: njs => new NginxJS().index(njs),
};
