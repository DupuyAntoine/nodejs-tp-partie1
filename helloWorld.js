'use strict';

var username = process.argv[2];

// Check if username exists
if (!username) {
    console.error('Missing argument! Example: node helloWorld.js YOUR_NAME');

    process.exit(1);
}

// Print the message in the console
console.log('Hello %s!', username);