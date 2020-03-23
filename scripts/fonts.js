const fs = require('fs');

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace('-', '');
}

const fontFileNames = () => {
  const array = fs.readdirSync('src/res/fonts').map(file => {
    return file.replace('.ttf', '');
  });

  return Array.from(new Set(array));
};

const generate = () => {
  const properties = fontFileNames()
    .map(name => {
      const key = name.replace(/\s/g, '');
      return `${camelize(key)}: '${name}'`;
    })
    .join(',\n  ');

  const string = `const fonts = {
  ${properties}
};

export default fonts;
`;

  fs.writeFileSync('src/res/fonts.js', string, 'utf8');
};

generate();
