require('dotenv').config();
// if (['development'].includes(process.env.NODE_ENV)) require('use-strict')

/**
 * Polyfill replaceAll function of string
 * which is currently not present in node v14
*/
String.prototype.replaceAll = function (search, replacement = '') {
  var target = this;
  return target.split(search).join(replacement);
};


const server = require('./server');
const port = process.env.PORT || 5000;


server.listen(port, () => console.info(`Server is listening at ${port}`));