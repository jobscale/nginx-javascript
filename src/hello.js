const dayjs = require('dayjs');

class Hello {
  say() {
    return `hello world - ${this.dateTime()}`;
  }

  dateTime() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
}

module.exports = {
  Hello,
  hello: new Hello(),
};
