# Typing Practice

This repo consists of simple scripts to help you improve your typing. The alphabets included are in Japanese, but they can easily be switched out for any custom set of characters in any language.

## Table of Contents
1. [Usage](#usage)
1. [Alphabet customization](#alphabet-customization)

## Usage

### To generate random characters to type:

```
node generateTypingPractice.js <alphabet chooser>
```

The alphabet chooser argument is optional. If included, it can be either of the following:

* a lesson number: a number from 1~15, to indicate what subset of the full alphabet you want to practice
* a custom alphabet name: a key for any custom alphabet you may want to use

### To practice typing:

Open the generated file in any text editor, and type out each line directly below it.

### To check your accuracy:

Make sure to save the file after you finish typing.

```
node checkTypingPractice.js
```

This will print out your percent accuracy, as well as a list of specific mistakes you made. This list will look like:

```
(character to type) --> (what you typed instead): (# of times you made this mistake)
```

This script will also add your mistakes to a JSON file so that you can see a long-term log of your mistakes, so that you can more efficiently see what characters you should practice.

## Alphabet customization

As mentioned, you can easily swap out the existing alphabets for any of your choosing.

The alphabets are included in the `generateTypingPractice.js` script. They take two forms:

### Lesson style

This supports an incremental style of learning, where you progressively add more characters.

Simply update the LESSON_ALPHABETS array with whatever strings of characters you would like to study instead.

When running the script, you can then pass in a lesson number as the `alphabet chooser` argument, and the script will use all characters in this array up to (and including) the characters in that lesson number.

### Custom style

This supports specific custom sets of characters, for example if you have already pinpointed your trouble keys.

Simply replace or add new key/value pairs to the CUSTOM_ALPHABETS object. The key can be any string without spaces, and the value is the alphabet as a string.

When running the script, the key will be what you pass in as the `alphabet chooser` argument to select that alphabet.