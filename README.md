# Typing Practice

This repo consists of simple scripts to help you improve your typing. The alphabets included are in Japanese, but they can easily be switched out for any custom set of characters in any language.

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
(character you were supposed to type) --> (what you typed instead): (number of times you made this mistake)
```

This script will also add your mistakes to a JSON file so that you can see a long-term log of your mistakes, so that you can more efficiently see what characters you should practice.