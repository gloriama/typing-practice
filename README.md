# Typing Practice

This repo consists of simple scripts to help you improve your typing. The alphabets included are in Japanese, but they can easily be switched out for any custom set of characters in any language.

## Table of Contents
1. [Usage](#usage)
1. [Alphabet customization](#alphabet-customization)

## Usage

### To generate characters to type:

```
node generate [flag] <alphabet-chooser>
```

* The `flag` argument is **required**: either `--random` for random characters, or `--input` to generate it from an input file.
  
  * If using `--input`, copy-paste some text into the file located at the `INPUT_FILE_NAME` path (editable in `config.js`).

* The `alphabet-chooser` argument is **optional**, and it is only relevant when used with the `--random` flag. If included, it can be either of the following:

  * a lesson number: a number from 1~13, to indicate what subset of the full alphabet you want to practice
  * a custom alphabet name: a key for any custom alphabet you may want to use

### To practice typing:

Open the generated file in any text editor, and type out each line directly below it.

### To check your accuracy:

Make sure to save the file after you finish typing.

```
node check
```

This will print out your percent accuracy, as well as a list of specific mistakes you made. This list will look like:

```
(character to type) --> (what you typed instead): (# of times you made this mistake)
```

This script will also add your mistakes to a JSON file so that you can see a long-term log of your mistakes. This will help pinpoint which characters you should practice most.

## Alphabet customization

As mentioned, you can easily swap out the existing alphabets for any of your choosing. Simply edit the alphabet-related fields inside `config.js`.

### `generateRandom` alphabets

This script uses two types of alphabets:

#### Lesson style

This supports an incremental style of learning, where you progressively add more characters.

Simply update the `LESSON_ALPHABETS` array with whatever strings of characters you would like to study instead.

When running the script, you can then pass in a lesson number as the `alphabet-chooser` argument, and the script will use all characters in this array up to (and including) the characters in that lesson number.

#### Custom style

This supports specific custom sets of characters, for example if you have already pinpointed your trouble keys.

Simply replace or add new key/value pairs to the `CUSTOM_ALPHABETS` object. The key can be any string without spaces, and the value is the alphabet as a string.

When running the script, the key will be what you pass in as the `alphabet-chooser` argument to select that alphabet.

### `generateFromInput` alphabets

This script uses two groups of characters:

#### Disallowed characters

All characters in the `DISALLOWED` string will simply be removed from your input, and will not appear in the generated typing practice. This allows you to remove characters that you do not want to waste your time practicing, or untypeable characters that have no reasonable replacement (see below).

#### Characters to convert

 These are characters that you want to replace with other characters. For example, on the Mac Japanese kana input keyboard, it is impossible to type `』`, so the script has been set to convert this character to the typeable character `」` instead.

Each character in `CONVERT_FROM` will be replaced with the corresponding character at the same index in `CONVERT_TO`.

*Developer note*: The conversion is represented with these two strings (rather than an object) to prevent excessive vertical space usage in `config.js`. Internally, it will be converted into an object before use.