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

var RANDOM_FLAG = '--random';
var INPUT_FLAG = '--input';

var generateRandom = require('./generateRandom');
var generateFromInput = require('./generateFromInput');

var flag = process.argv[2];
var alphabetChooser = process.argv[3];

if (flag === RANDOM_FLAG) {
  generateRandom(alphabetChooser);
} else if (flag === INPUT_FLAG) {
  generateFromInput();
} else {
  console.log('Please supply a valid flag argument:', RANDOM_FLAG, 'or', INPUT_FLAG);
}