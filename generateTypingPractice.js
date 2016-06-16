// Given an alphabet, outputs lines of random characters from it
// to a file

var alphabets = [
  'ちとしは', // 1
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
var RIGHT_PINKY_ALPHABET='わほ゜せ゛むへれけろめ';
var ALL_HIRAGANA = 'あいうえおぁぃぅぇ' +
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

var getAlphabetForLesson = function(lesson) {
  return alphabets.slice(0, lesson).join('');
};

var getRandomChar = function(alphabet) {
  var randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
};

var getRandomChars = function(alphabet, numChars) {
  result = '';
  for (var i = 0; i < numChars; i++) {
    result += getRandomChar(alphabet);
  }
  return result;
};

// main
var fs = require('fs');
var DEFAULT_CURR_LESSON = 15;
var NUM_LINES = 5;
var LINE_LENGTH = 36;
var alphabet = ALL_HIRAGANA; //getAlphabetForLesson(process.argv[2] || DEFAULT_CURR_LESSON);
var output = [];
for (var i = 0; i < NUM_LINES; i++) {
  output.push(getRandomChars(alphabet, LINE_LENGTH));
}
output = output.join('\n\n\n');
output += '\n';

fs.writeFileSync('TYPINGPRACTICE.txt', output);