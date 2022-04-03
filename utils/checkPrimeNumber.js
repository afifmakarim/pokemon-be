const checkPrimeNumber = (number) => {
  // program to check if a number is prime or not

  // take input from the user
  let isPrime = true;

  // check if number is equal to 1
  if (number === 1) {
    return isPrime;
  }

  // check if number is greater than 1
  else if (number > 1) {
    // looping through 2 to number-1
    for (let i = 2; i < number; i++) {
      if (number % i == 0) {
        isPrime = false;
        break;
      }
    }

    // if (isPrime) {
    //   console.log(`${number} is a prime number`);
    // } else {
    //   console.log(`${number} is a not prime number`);
    // }
    return isPrime;
  }

  // check if number is less than 1
  else {
    return isPrime;
  }
};
// console.log(checkPrimeNumber(3));
module.exports = checkPrimeNumber;
