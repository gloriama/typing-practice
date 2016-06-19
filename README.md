# Typing Practice

This repo consists of two simple scripts to help practice typing:
* `generate`, which outputs customizeable lines of characters
* `check`, which scans for mistakes and logs them to a JSON file

The alphabets included are in Japanese, but they can easily be switched out for any set of characters in any language (see [Customization](#customization)).

## Table of Contents
1. [Quick start](#quick-start)
1. [Usage](#usage)
1. [Customization](#customization)

## Quick start
```
git clone https://github.com/gloriama/typing-practice.git && cd typing-practice
node generate --random
```
Open `OUTPUT.txt` in any text editor, type each line directly below it, and save the file.
```
node check
```

## Usage

This is a more detailed documentation of the commands above.

### `generate`

```
node generate [flag] <alphabet-chooser>
```

* The `flag` argument is **required**: either `--random` for random characters, or `--input` to generate lines from an input file.
  
  * If using `--input`, first copy-paste some text in your target language into the file located at the `INPUT_FILE_NAME` path (editable in `config.js`). The script will pull in the first few lines' worth of the input file, removing or replacing characters as specified in `config.js` (see [Configuration](#configuration) below).

* The `alphabet-chooser` argument is **optional**, and it is only relevant when used with the `--random` flag.

  * If included, the argument can be either of the following:
    * a lesson number: a number from 1~13, to indicate what subset of the alphabet you want to practice. Each subsequent lesson adds another portion of the keyboard.
    * a custom alphabet name: a key for any custom alphabet you may want to use

  * If excluded, the script will default to the custom alphabet designated in `config.js`.

### `check`

```
node check
```

This will print out your percent accuracy, as well as a list of specific mistakes you made. This list will have the following format:

```
(character to type) --> (what you typed instead): (# of times you made this mistake)
```

This script will also add your mistakes to a JSON file, so that you can see a long-term log of your mistakes. This will help pinpoint which characters you should practice most.

## Customization

To modify this repo for any other character set you would like to practice typing, simply edit the following fields inside `config.js`.

### Fields for `generateRandom`

These fields are used when generating random typing practice, using the `--random` flag.

* `LESSON_ALPHABETS`

This array is used when a lesson number is passed in as the `alphabet-chooser` argument. Replace each string in the array with the string containing the corresponding characters in your language of choice.

* `CUSTOM_ALPHABETS`

This hash is used when a custom alphabet name is passed in as the `alphabet-chooser` argument. Create and name as many custom sets of characters as you like. The key can be any string without spaces, and the value is the string containing the corresponding character set.

### Fields for `generateFromInput`

These fields are used when generating typing practice from an input file, using the `--input` flag.

* `DISALLOWED`

This string is used to specify what characters from the input file to remove. This allows you to remove characters that you do not want to waste your time practicing, or untypeable characters that have no reasonable replacement.

Note that `\n` MUST stay in this string, since the `check` script parses based on newlines.

* `CONVERT_FROM` and `CONVERT_TO`

These strings are used to specify what characters from the input file to replace with other characters. For example, on the Mac Japanese kana input keyboard, it is impossible to type `』`, so the script has been set to convert this character to the typeable character `」` instead.

Each character in `CONVERT_FROM` will be replaced with the corresponding character at the same index in `CONVERT_TO`.

*Developer note*: The conversion is represented with these two strings (rather than an object) to prevent excessive vertical space usage in `config.js`. Internally, it will be converted into an object before use.