// BMD - Lets establish our generatePassword function 
// JS to utilize: Arrays, gamut arrays with split conditional, DOM elements (alert), and selection randomization

function generatePasswordGamut(upperCaseOption, lowerCaseOption, numericOption, specialOption) {
  var lowercaseChar = 'abcdefghijklmnopqrstuvwxyz'.split("");
  var uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
  var numericChar = '1234567890'.split("");
  var specialChar = '!@#$%^&*()_.,?+-'.split("");
  var usableChar = [];
  // Generate the array of only characters we want to use in the generated password
  if (upperCaseOption) {
    usableChar = usableChar.concat(uppercaseChar);
  }

  if (lowerCaseOption) {
    usableChar = usableChar.concat(lowercaseChar);
  }

  if (numericOption) {
    usableChar = usableChar.concat(numericChar);
  }

  if (specialOption) {
    usableChar = usableChar.concat(specialChar);
  }
  return usableChar;
}

// This is my Math.random() method for picking a random number. Can be called within my for loop
// Got this from MDN
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function generatePasswordOfLength(charLimit, upperCaseOption, lowerCaseOption, numericOption, specialOption) {
  var usableChar = generatePasswordGamut(upperCaseOption, lowerCaseOption, numericOption, specialOption);
  var result = "";

  for (var i = 0; i < charLimit; i++) {
    var charIndex = getRandomInt(usableChar.length);
    var newChar = usableChar[charIndex];
    result = result + newChar;
  }
  return result;
}


function askQuestion(message, validate) {
  var answered = false;
  var result;

  do {
    result = prompt(message);
    if (result === null) {
      // Cancel was clicked
      answered = true;
    } else {
      result = validate(result);
      if (result !== null) {
        answered = true;
      }
    }
  } while (!answered);
  return result;
}

function validateYesNo(value) {
  if (value.toLowerCase() == "yes") {
    return true;
  } else if (value.toLowerCase() === "no") {
    return false;
  }
  return null;
}



function generatePassword() {
  var charLimit = askQuestion('Please choose a password length between 8-128 characters:', function (value) {
    if (isNaN(value) || value <= 8 || value >= 128) {
      return null;
    }
    return value;
  });

  // Nesting sequence in event of cancel button (prompt)
  if (charLimit !== null) {
    var upperCaseOption = askQuestion('Do you want to use Upper Case Characters: (Yes or No)', validateYesNo);
    if (upperCaseOption !== null) {
      var lowerCaseOption = askQuestion('Do you want to use Lower Case Character: (Yes or No)', validateYesNo);
      if (lowerCaseOption !== null) {
        var numericOption = askQuestion('Do you want to use Numeric Characters: (Yes or No)', validateYesNo);
        if (numericOption !== null) {
          var specialOption = askQuestion('Do you want to use special Characters: (Yes or No)', validateYesNo);

          if (!upperCaseOption && !lowerCaseOption && !numericOption && !specialOption) {
            alert("You must answer yes to at least one option.");
          } else {
            return generatePasswordOfLength(charLimit, upperCaseOption, lowerCaseOption, numericOption, specialOption);
          }

        }
      }
    }
  }
}




// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password) {
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

  }
}




// Assignment Code
var generateBtn = document.querySelector("#generate");


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);






// Brandt Todos:
// TODO: Clicking button generates unique password
// TODO: A series of prompts occurs that take user through password criteria/options
// TODO: Length of the password can be between 9 characters and no more than 128 characters
// TODO: We need lowercase, uppercase, numeric, and/or special characters options to include
// TODO: Answers to prompts must be validated and one character type selected using math method
// TODO: Finally, a password is generated in the text area (or prompt) that matches the criteria