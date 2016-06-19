// Flag names
exports.RANDOM_FLAGS = [ '--random', '-r' ];
exports.INPUT_FLAGS = [ '--input', '-i' ];

// File names
exports.INPUT_FILE_NAME = 'INPUT.txt';
exports.OUTPUT_FILE_NAME = 'OUTPUT.txt',
exports.MISTAKES_FILE_NAME = 'MISTAKES.json';

// Output size
exports.NUM_LINES = 5;
exports.LINE_LENGTH = 36;

// Alphabets
exports.LESSON_ALPHABETS = [
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
  'ほ゜'       // Lesson 13 (Number row, pinky reach): -=
];
exports.CUSTOM_ALPHABETS = {
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
  CURRENT: 'けれうあほ゜とて゛むわ'
};
exports.DEFAULT_ALPHABET_KEY = 'ALL_HIRAGANA';
exports.DISALLOWED = '\n＝'; // note: \n MUST be in this string
exports.CONVERT_FROM =
  '1234567890!@#$%^&*()' +
  '『』[]【】{}`;\',./~～_|:"<>?… ';
exports.CONVERT_TO =
  '１２３４５６７８９０！＠＃＄％＾＆＊（）' +
  '「」［］［］｛｝｀；’，．／〜〜＿｜：”＜＞？　　';

// Miscellaneous
exports.MAX_NUM_MISTAKES = 15;