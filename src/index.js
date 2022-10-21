const { hello } = require('./hello');

class NginxJS {
  index(njs) {
    Promise.resolve({ ...njs })
    .then(nJS => {
      this.setHeaders(njs);
      njs.return(200, this.action(nJS));
    })
    .catch(e => {
      njs.return(500, this.fault(e));
    });
  }

  action(nJS) {
    if (nJS.args.e) throw new Error(`found e '${nJS.args.e}'`);
    return JSON.stringify({ message: hello.say(), nJS }, null, 2);
  }

  fault(e) {
    return JSON.stringify({ [`${e.name}`]: e.message }, null, 2);
  }

  setHeaders(njs) {
    njs.headersOut['Content-Type'] = "application/json";
    njs.headersOut['X-Message'] = hello.say();
  }
}

global.NginxJS = {
  index: njs => new NginxJS().index(njs),
};
