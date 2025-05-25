const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  {
    text: "Who was the first president of the USA?",
    options: [
      "1. George Washington",
      "2. Abraham Lincoln",
      "3. George W Bush",
      "4. Ronald Regan",
    ],
    answer: 1,
  },
  {
    text: "What does EV stand for?",
    options: [
      "1. Ecstatic Vehicle",
      "2. Electric Volvo",
      "3. Electric Vehicle",
      "4. Exxon and Volvo",
    ],
    answer: 3,
  },
  {
    text: "When was WWI",
    options: ["1. 1865", "2. 1972", "3. 1901", "4. 1914"],
    answer: 4,
  },
];

let score = 0;
let current = 0;
const timeLimit = 30000; // 30 seconds total
let timeUp = false;
const startTime = Date.now();

const timer = setTimeout(() => {
  timeUp = true;
  console.log("\n\nTime's up!");
  console.log(`Your final score is ${score} out of ${questions.length}.`);
  rl.close();
}, timeLimit);

function askQuestion() {
  if (current === questions.length) {
    clearTimeout(timer); // Stop timer if all questions answered
    console.log(
      `\nGame over! Your final score is ${score} out of ${questions.length}.`
    );
    rl.close();
    return;
  }

  if (timeUp) return; // Stop asking if time is up

  const q = questions[current];
  console.log(`\n${q.text}`);
  q.options.forEach((option) => console.log(option));

  rl.question("Your answer (type the number): ", (input) => {
    if (timeUp) return; // Ignore answers if time is up

    if (parseInt(input) === q.answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log(`Wrong! The answer is: ${q.answer}.`);
    }
    current++;

    // Calculate remaining time
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, Math.floor((timeLimit - elapsed) / 1000));
    console.log(`Remaining time: ${remaining} seconds`);

    askQuestion();
  });
}

askQuestion();
