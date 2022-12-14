const path = require('path');
const fs = require('fs');
const viewsPath = path.resolve(__dirname, '../src/pages');
const pages = fs.readdirSync(viewsPath);

module.exports = pages.map((str) => {
  let route = `/${str.replace(/.vue/, '')}`;
  route = route.replace(/Index/, '');
  return route;
});
