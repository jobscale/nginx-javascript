const dayjs = require('dayjs');

class Hello {
  say() {
    return `hello world - ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`;
  }
}
module.exports = {
  Hello,
  hello: new Hello(),
};
