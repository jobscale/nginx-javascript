const { hello } = require('./hello');

class NginxJS {
  index(event) {
    this.setHeaders(event);
    event.return(200, JSON.stringify({ message: hello.say(), event: JSON.stringify(event) }));
  }

  setHeaders(event) {
    event.headersOut['Content-Type'] = "application/json";
  }
}

global.NginxJS = new NginxJS();
