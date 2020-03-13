const fs = require('fs');

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '')
    .replace('-', '');
}

const imageFileNames = () => {
  const array = fs
    .readdirSync('src/res/icons')
    .filter((file) => { return file.endsWith('.svg') })
    .map((file) => {
      return file.replace('.svg', '')
    });
  return Array.from(new Set(array))
};

const generate = () => {
  let properties = imageFileNames()
    .map((name) => {
      return `${camelize(name)}: require('./icons/${name}.svg')`
    })
    .join(',\n  ');

const string = `const icons = {
  ${properties}
};

export default icons;
`;

fs.writeFileSync('src/res/icons.js', string, 'utf8')
};

generate();