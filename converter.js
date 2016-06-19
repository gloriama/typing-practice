// Converts input to something typeable in Macbook's
// Japanese kana input keyboard

var INPUT_FILE_NAME = 'CONVERTER_INPUT.txt';
var OUTPUT_FILE_NAME = 'CONVERTER_OUTPUT.txt';

var stringToSet = function(str) {
  return str.split('').reduce(function(acc, char) {
    acc[char] = true;
    return acc;
  }, {});
};

var disallowedChars = '\n';
disallowedChars = stringToSet(disallowedChars);
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

var NUM_LINES = 5;
var LINE_LENGTH = 36;
var numCharsNeeded = NUM_LINES * LINE_LENGTH;

// Remove and/or convert characters as specified in
//   disallowedChars and converter (see above)
// Continue until we have numCharsNeeded (or end of input)
var lines = [];
var currLine = '';
for (var i = 0; i < contents.length && lines.length < NUM_LINES; i++) {
  var char = contents[i];
  if (char in disallowedChars) {
    continue;
  } else {
    currLine += char in converter ? converter[char] : char;
    if (currLine.length === LINE_LENGTH || i === contents.length - 1) {
      lines.push(currLine + '\n');
      currLine = '';
    }
  }
}

// Update INPUT_FILE_NAME to be the remaining input
var remainingInput = contents.slice(i);
fs.writeFileSync(INPUT_FILE_NAME, remainingInput);

// Write output to OUTPUT_FILE_NAME
fs.writeFileSync(OUTPUT_FILE_NAME, lines.join('\n\n'));