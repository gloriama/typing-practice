// ---- HELPER FUNCTIONS ----

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

module.exports = function(fs, config, alphabetArg) {
  // Returns a string of all characters introduced up to
  // (and including) the current lesson
  var getAlphabetForLessonNumber = function(lessonNumber) {
    return config.LESSON_ALPHABETS.slice(0, lessonNumber).join('');
  };

  // Set alphabet
  var alphabet = config.DEFAULT_ALPHABET;
  if (alphabetArg !== undefined) {
    if (alphabetArg in config.CUSTOM_ALPHABETS) {
      alphabet = config.CUSTOM_ALPHABETS[alphabetArg];
      console.log('Using custom alphabet:', alphabetArg);
    } else {
      var lessonNumber = parseInt(alphabetArg);
      if (lessonNumber >= 1 && lessonNumber <= config.LESSON_ALPHABETS.length) {
        alphabet = getAlphabetForLessonNumber(lessonNumber);
        console.log('Using alphabet for lesson:', lessonNumber)
      } else {
        console.log('Invalid alphabet entered, defaulting to ALL_HIRAGANA alphabet');
      }
    }
  } else {
    console.log('Defaulting to ALL_HIRAGANA alphabet');
  }

  // Generate random output
  var lines = [];
  for (var i = 0; i < config.NUM_LINES; i++) {
    lines.push(getRandomChars(alphabet, config.LINE_LENGTH));
  }
  return lines;
};