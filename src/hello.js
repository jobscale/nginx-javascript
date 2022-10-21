const dayjs = require('dayjs');

class Hello {
  say() {
    return `hello world - ${this.dateTime()}`;
  }

  dateTime() {
    return `${dayjs().format('YYYY-MM-DD HH:mm:ss')} ${process.env.TZ || 'GMT'}`;
  }
}

module.exports = {
  Hello,
  hello: new Hello(),
};
