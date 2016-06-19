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
var cleaned = '';
for (var i = 0; i < contents.length && cleaned.length < numCharsNeeded; i++) {
  var char = contents[i];
  if (char in disallowedChars) {
    continue;
  } else {
    cleaned += char in converter ? converter[char] : char;
  }
}

// Update INPUT_FILE_NAME to be the remaining input
var remainingInput = contents.slice(i);
fs.writeFileSync(INPUT_FILE_NAME, remainingInput);

// Separate cleaned characters into lines
var output = '';
for (var i = 0; i < cleaned.length; i += LINE_LENGTH) {
  output += cleaned.slice(i, i + LINE_LENGTH) + '\n\n\n';
}

// Remove final newline
output = output.slice(0, output.length - 1);

fs.writeFileSync(OUTPUT_FILE_NAME, output);