// ---- HELPER FUNCTIONS ----

// Returns a random character from an alphabet string
var getRandomChar = function(alphabet) {
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
  var alphabet = config.CUSTOM_ALPHABETS[config.DEFAULT_ALPHABET_KEY];
  if (alphabetArg !== undefined) {
    if (alphabetArg in config.CUSTOM_ALPHABETS) {
      alphabet = config.CUSTOM_ALPHABETS[alphabetArg];
      console.log('Using custom alphabet:', alphabetArg);
    } else {
      var lessonNumber = parseInt(alphabetArg);
      if (lessonNumber >= 1 && lessonNumber <= config.LESSON_ALPHABETS.length) {
        alphabet = getAlphabetForLessonNumber(lessonNumber);
        console.log('Using alphabet for lesson number:', lessonNumber)
      } else {
        console.log('WARNING: Invalid alphabet-chooser argument');
        console.log('Using default alphabet:', config.DEFAULT_ALPHABET_KEY);
      }
    }
  } else {
    console.log('Using default alphabet:', config.DEFAULT_ALPHABET_KEY);
  }

  // Generate random output
  var lines = [];
  for (var i = 0; i < config.NUM_LINES; i++) {
    lines.push(getRandomChars(alphabet, config.LINE_LENGTH));
  }
  return lines;
};