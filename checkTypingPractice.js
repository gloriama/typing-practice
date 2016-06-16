var fs = require('fs');
var FILE_NAMES = require('./fileNames');

// Read contents from file
var contents = fs.readFileSync(FILE_NAMES.TYPING_PRACTICE, 'utf-8');
var lines = contents.split('\n');

// Record mistakes
var mistakes = {};
var numMistakes = 0;
var numTotal = 0;
for (var i = 0; i < lines.length; i += 3) {
  var prompt = lines[i];
  var answer = lines[i + 1];
  var blankLine = lines[i + 2]; // unneeded

  for (var j = 0; j < prompt.length; j++) {
    var promptChar = prompt[j];
    var answerChar = answer[j];
    if (promptChar !== answerChar) {
      numMistakes++;
      mistakes[promptChar] = mistakes[promptChar] || {};
      mistakes[promptChar][answerChar] = (mistakes[promptChar][answerChar] || 0) + 1
    }
    if (promptChar !== '\n') {
      numTotal++;
    }
  };
}

var mergeMistakes = function(dest, source) {
  for (var promptChar in source) {
    for (var answerChar in source[promptChar]) {
      dest[promptChar] = dest[promptChar] || {};
      dest[promptChar][answerChar] = (dest[promptChar][answerChar] || 0) + source[promptChar][answerChar];
    }
  }
};

// Print mistakes information to console
var percentAccuracy = Math.round((numTotal - numMistakes) * 10000 / numTotal) / 100;
console.log('Number of mistakes:', numMistakes, '/', numTotal);
console.log('          Accuracy:', percentAccuracy + '%')
for (var promptChar in mistakes) {
  for (var answerChar in mistakes[promptChar]) {
    console.log(promptChar, '-->', answerChar + ':', mistakes[promptChar][answerChar]);
  }
}

// Record historical mistakes, creating file if necessary
var historicalMistakes = {};
if (fs.existsSync(FILE_NAMES.MISTAKES_LOG)) {
  historicalMistakes = JSON.parse(fs.readFileSync(FILE_NAMES.MISTAKES_LOG));
}
if (numMistakes < 15) {
  mergeMistakes(historicalMistakes, mistakes);
}
fs.writeFileSync(FILE_NAMES.MISTAKES_LOG, JSON.stringify(historicalMistakes));