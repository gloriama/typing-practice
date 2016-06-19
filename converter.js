// Converts input to something typeable in Macbook's
// Japanese kana input keyboard

var INPUT_FILE_NAME = 'CONVERTER_INPUT.txt';
var OUTPUT_FILE_NAME = 'TYPINGPRACTICE.txt';

var stringToHash = function(keys, values) {
  // keys and values are both strings of characters
  // must be the same length

  // if values string is not given, all values default
  // to true

  return keys.split('').reduce(function(acc, char) {
    acc[char] = values ? values[char] : true;
    return acc;
  }, {});
};

// Specify disallowed characters and characters to convert
var DISALLOWED = '\n';
var CONVERT_FROM = '『』[]1234567890!@#$%^&*()';
var CONVERT_TO = '「」［］１２３４５６７８９０！＠＃＄％＾＆＊（ ）';

// Convert to hashes
var disallowed = stringToHash(DISALLOWED);
var converter = stringToHash(CONVERT_FROM, CONVERT_TO);

var fs = require('fs');
var contents = fs.readFileSync(INPUT_FILE_NAME, 'utf-8');

var NUM_LINES = 5;
var LINE_LENGTH = 36;
var numCharsNeeded = NUM_LINES * LINE_LENGTH;

// Remove and/or convert characters as specified in
//   disallowed and converter (see above)
// Continue until we have numCharsNeeded (or end of input)
var lines = [];
var currLine = '';
for (var i = 0; i < contents.length && lines.length < NUM_LINES; i++) {
  var char = contents[i];
  if (char in disallowed) {
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