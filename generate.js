// Either call generateRandom or generateFromInput

// Usage: node generate --[flag] <alphabet-chooser>
// -flag: either 'random' or 'input'
// -alphabetChooser: either lesson number or alphabet name
//  (see generateRandom.js for specifics)

/*
process.argv = [
  path_to_node,
  path_to_this_generate.js_file,
  flag,
  alphabet-chooser (optional)
]
*/

var fs = require('fs');
var config = require('./config');
var generateRandom = require('./generateRandom');
var generateFromInput = require('./generateFromInput');

var flag = process.argv[2];
var alphabetChooser = process.argv[3];

// Generate lines
var lines;
if (flag === config.RANDOM_FLAG) {
  lines = generateRandom(fs, config, alphabetChooser);
} else if (flag === config.INPUT_FLAG) {
  lines = generateFromInput(fs, config);
} else {
  console.log('Please supply a valid flag argument:', RANDOM_FLAG, 'or', INPUT_FLAG);
  return;
}

// Write output to file
var output = lines.map(function(line) {
  return line + '\n';
}).join('\n\n');
fs.writeFileSync(config.OUTPUT_FILE_NAME, output);

// Print information to console
console.log('Generated', lines.length, 'lines of input');