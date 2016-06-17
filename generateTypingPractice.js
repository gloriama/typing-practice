// ---- ALPHABETS ----

var LESSON_ALPHABETS = [
  'ちとしは',   // Lesson 1 (Home keys, LH): asdf
  'まのりれ',   // Lesson 2 (Home keys, RH): jkl;
  'きく',      // Lesson 3 (Home row, index reach): gh
  'けろ', 　　  // Lesson 4 (Home row, pinky reach): '
  'たていすか', // Lesson 5 (Top row, LH): qwert
  'んなにらせ', // Lesson 6 (Top row, RH): yuiop
  '゛むへ',    // Lesson 7 (Top row, pinky reach): []\
  'つさそひこ', // Lesson 8 (Bottom row, LH): zxcvb
  'みもねるめ', // Lesson 9 (Bottom row, RH): nm,./
  '、。・',    // Lesson 10 (Bottom row, RH Shift)
  'ぬふあうえ', // Lesson 11 (Number row, LH): 12345
  'おやゆよわ', // Lesson 12 (Number row, RH): 67890
  'ほ゜'      // Lesson 13 (Number row, pinky reach): -=
];
var CUSTOM_ALPHABETS = {
  RIGHT_PINKY: 'わほ゜せ゛むへれけろめ',
  ALL_HIRAGANA: 'あいうえおぁぃぅぇゔ' +
  'かきくけこがぎぐげご' +
  'さしすせそざじずぜぞ' +
  'たちつてとだぢづでどっ' +
  'なにぬねの' +
  'はひふへほばびぶべぼぱぴぷぺぽ' +
  'まみむめも' +
  'やゆよゃゅょ' +
  'らりるれろ' +
  'わを' +
  'ー',
  // CURRENT: 'けうぼぅむだぽびど'
  CURRENT: 'けれうあほ゜とて゛むわ'
};


// ---- OTHER DEFAULTS ----

var fs = require('fs');
var FILE_NAMES = require('./fileNames');
var DEFAULT_ALPHABET = CUSTOM_ALPHABETS.ALL_HIRAGANA;
var NUM_LINES = 5;
var LINE_LENGTH = 36;


// ---- HELPER FUNCTIONS ----

// Returns a string of all characters introduced up to
// (and including) the current lesson
var getAlphabetForLesson = function(lessonNumber) {
  return LESSON_ALPHABETS.slice(0, lessonNumber).join('');
};

// Returns a random character from an alphabet string
var getRandomChar = function(alphabet, charNotToMatch) {
  var randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
};

// Returns a string of random characters from an alphabet
// string, of length numChars
// Does not allow repeated consecutive characters
var getRandomChars = function(alphabet, numChars) {
  result = '';
  var nextChar;
  for (var i = 0; i < numChars; i++) {
    while ((nextChar = getRandomChar(alphabet)) === result[i - 1]) {
      // deliberately empty
    }
    result += nextChar;
  }
  return result;
};


// ---- MAIN ----

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
} else {
  console.log('Defaulting to ALL_HIRAGANA alphabet');
}

// Generate random output
var output = [];
for (var i = 0; i < NUM_LINES; i++) {
  output.push(getRandomChars(alphabet, LINE_LENGTH));
}
output = output.join('\n\n\n');
output += '\n';

// Write to file
fs.writeFileSync(FILE_NAMES.TYPING_PRACTICE, output);