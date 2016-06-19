// Converts input to something typeable in Macbook's
// Japanese kana input keyboard

var FILE_NAMES = require('./fileNames');

var stringToHash = function(keys, values) {
  // keys and values are both strings of characters
  // must be the same length

  // if values string is not given, all values default
  // to true

  return keys.split('').reduce(function(acc, key, i) {
    acc[key] = values ? values[i] : true;
    return acc;
  }, {});
};

// Specify disallowed characters and characters to convert
var DISALLOWED = '\n＝';
var CONVERT_FROM = '1234567890!@#$%^&*()『』[]`~～';
var CONVERT_TO = '１２３４５６７８９０！＠＃＄％＾＆＊（）「」［］｀〜〜';

// Convert to hashes
var disallowed = stringToHash(DISALLOWED);
var converter = stringToHash(CONVERT_FROM, CONVERT_TO);
var fs = require('fs');
var contents = fs.readFileSync(FILE_NAMES.INPUT, 'utf-8');

var NUM_LINES = 5;
var LINE_LENGTH = 36;
var numCharsNeeded = NUM_LINES * LINE_LENGTH;

// Remove and/or convert characters as specified in
//   disallowed and converter (see above)
// Continue until we have numCharsNeeded (or end of input)
module.exports = function() {
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

  // Update FILE_NAMES.INPUT to be the remaining input
  var remainingInput = contents.slice(i);
  fs.writeFileSync(FILE_NAMES.INPUT, remainingInput);

  // Write output to FILE_NAMES.TYPING_PRACTICE
  fs.writeFileSync(FILE_NAMES.TYPING_PRACTICE, lines.join('\n\n'));
};