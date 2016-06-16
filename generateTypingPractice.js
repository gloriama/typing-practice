// Given an alphabet, outputs lines of random characters from it
// to a file

// Usage: node generateTypingPractice.js <lesson number || name of custom alphabet>
//   -lesson number: an integer from 1~15
//   -name of custom alphabet: any key existing in CUSTOM_ALPHABETS (see below)

// These alphabets conform to the introduction of new keys
// from Touch Typing Tutor (http://www.typingme.com/touch-typing/typing-tutor.php)
var LESSON_ALPHABETS = [
  'ちとしは', // Lesson 1
  'まのりれ', // 2 
  '', // 3
  'きく', // 4
  'け', // 5
  'ろ', // 6
  'たていすか', // 7
  'んなにらせ', // 8
  'つさそひこ', // 9
  'みもねるめ', // 10
  'ぬふあうえ', // 11
  'おやゆよわ', // 12
  'ほ゜', // 13
  '゛むへ', // 14
  '' // 15
];
var CUSTOM_ALPHABETS = {
  RIGHT_PINKY: 'わほ゜せ゛むへれけろめ',
  ALL_HIRAGANA: 'あいうえおぁぃぅぇ' +
  'かきくけこがぎぐげご' +
  'さしすせそざじずぜぞ' +
  'たちつてとだぢづでどっ' +
  'なにぬねの' +
  'はひふへほばびぶべぼぱぴぷぺぽ' +
  'まみむめも' +
  'やゆよゃゅょ' +
  'らりるれろ' +
  'わを' +
  'ー'
};

// Returns a string of all characters introduced up to
// (and including) the current lesson
var getAlphabetForLesson = function(lessonNumber) {
  return LESSON_ALPHABETS.slice(0, lessonNumber).join('');
};

// Returns a random character from an alphabet string
var getRandomChar = function(alphabet) {
  var randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
};

// Returns a string of random characters from an alphabet
// string, of length numChars
var getRandomChars = function(alphabet, numChars) {
  result = '';
  for (var i = 0; i < numChars; i++) {
    result += getRandomChar(alphabet);
  }
  return result;
};

// ---- Main ----
var fs = require('fs');

var DEFAULT_ALPHABET = CUSTOM_ALPHABETS.ALL_HIRAGANA;
var NUM_LINES = 5;
var LINE_LENGTH = 36;
var OUTPUT_FILE_NAME = 'TYPINGPRACTICE.txt';

// Set alphabet, based on input
var alphabet = DEFAULT_ALPHABET;
var alphabetArg = process.argv[2];
if (alphabetArg !== undefined) {
  if (alphabetArg in CUSTOM_ALPHABETS) {
    alphabet = CUSTOM_ALPHABETS[alphabetArg];
    console.log('Using custom alphabet:', alphabetArg);
  } else {
    var lessonNumber = parseInt(alphabetArg);
    if (lessonNumber >= 1 && lessonNumber <= LESSON_ALPHABETS.length) {
      alphabet = getAlphabetForLesson(lessonNumber);
      console.log('Using alphabet for lesson:', lessonNumber)
    } else {
      console.log('Invalid alphabet entered, defaulting to ALL_HIRAGANA alphabet');
    }
  }
}

// Generate random output
var output = [];
for (var i = 0; i < NUM_LINES; i++) {
  output.push(getRandomChars(alphabet, LINE_LENGTH));
}
output = output.join('\n\n\n');
output += '\n';

// Write to file
fs.writeFileSync(OUTPUT_FILE_NAME, output);