// Converts input to something typeable in Macbook's
// Japanese kana input keyboard

var INPUT_FILE_NAME = 'CONVERTER_INPUT.txt';
var OUTPUT_FILE_NAME = 'CONVERTER_OUTPUT.txt';

var disallowedChars = '';
disallowedChars = disallowedChars.split('').reduce(function(acc, char) {
  acc[char] = true;
  return acc;
}, {});

var converter = {
  '『': '',
  '』': '',
  '[': '［',
  ']': '］',
  '1': '１',
  '2': '２',
  '3': '３',
  '4': '４',
  '5': '５',
  '6': '６',
  '7': '７',
  '8': '８',
  '9': '９',
  '0': '０',
  '!': '！',
  '@': '＠',
  '#': '＃',
  '$': '＄',
  '%': '％',
  '^': '＾',
  '&': '＆',
  '*': '＊',
  '(': '（',
  ')': '）',
};

var fs = require('fs');
var contents = fs.readFileSync(INPUT_FILE_NAME, 'utf-8');

// Needed since regular expressions cannot parse
// non English characters
var customSplit = function(str) {
  var separators = {
    '\n': true,
    // '、': true,
    // '。': true
  };
  var curr = '';
  return str.split('').reduce(function(acc, char) {
    if (char in separators) {
      acc.push(curr);
      curr = '';
    } else {
      curr += char;
    }
    return acc;
  }, []);
};
var chunks = customSplit(contents);
var unknown = {};

var sifted = chunks.map(function(chunk) {
  return chunk.split('').map(function(char) {
    if (char in disallowedChars) {
      return '';
    } else {
      return (char in converter) ? converter[char] : char;
    }
  }).join('');
}).join('');

// Standardize sifted characters into 36-char chunks
var LINE_LENGTH = 36;
var output = '';

for (var i = 0; i < sifted.length; i += LINE_LENGTH) {
  output += sifted.slice(i, i + LINE_LENGTH) + '\n\n\n';
}

// Remove final newline
output = output.slice(0, output.length - 1);

fs.writeFileSync(OUTPUT_FILE_NAME, output);