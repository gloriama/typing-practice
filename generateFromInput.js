// Converts input to something typeable in Macbook's
// Japanese kana input keyboard

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

// Remove and/or convert characters as specified in
//   disallowed and converter (see above)
// Continue until we have numCharsNeeded (or end of input)
module.exports = function(fs, config) {
  // Convert config data to hashes
  var disallowed = stringToHash(config.DISALLOWED);
  var converter = stringToHash(config.CONVERT_FROM, config.CONVERT_TO);
  
  // Remove and convert characters in input
  // Stop once desired output size has been reached
  var contents = fs.readFileSync(config.INPUT_FILE_NAME, 'utf-8');
  var lines = [];
  var currLine = '';
  for (var i = 0; i < contents.length && lines.length < config.NUM_LINES; i++) {
    var char = contents[i];
    if (char in disallowed) {
      continue;
    } else {
      currLine += char in converter ? converter[char] : char;
      if (currLine.length === config.LINE_LENGTH || i === contents.length - 1) {
        lines.push(currLine + '\n');
        currLine = '';
      }
    }
  }

  // Update input file to be the remaining input
  var remainingInput = contents.slice(i);
  fs.writeFileSync(config.INPUT_FILE_NAME, remainingInput);

  // Write output to output file
  fs.writeFileSync(config.OUTPUT_FILE_NAME, lines.join('\n\n'));
};