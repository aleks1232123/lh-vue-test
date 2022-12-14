const utils = require('loader-utils');
const fs = require('fs');

const findAndReplace = function(source, dir) {
  const result = { count: 0, source: '', files: [] };
  result.source = source.replace(/("file::.+")/gm, (replacement) => {
    let file = replacement.replace(/("|file::)/gm, '');
    result.count += 1;
    file = `${dir}${file}`;
    result.files.push(file);
    return fs.readFileSync(file);
  });
  return result;
};

module.exports = function(source) {
  const options = utils.getOptions(this);
  let files = [];
  if (this.cacheable) this.cacheable();
  do {
    replace = (findAndReplace(source, options.dir));
    source = replace.source;
    files = files.concat(replace.files);
  } while (replace.count !== 0);
  [...new Set(files)].map(item => this.addDependency(item));
  return source;
};
