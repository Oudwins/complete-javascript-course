/* Init the game
0) Somewhere to store the questios -> object + array of objects to choose which.
1) randomly choose a question from a list
2) Print the question with the answers
3) If you choose the correct answer X */
//Variables
var questions, randomNum, num, answer;

function Question(question, answers, correct) {
  this.question = question;
  this.answers = answers;
  this.correct = correct;
}
var q1 = new Question("Please choose 0", ["a", "b", "c"], 0);
var q2 = new Question("Please choose 1", ["a", "b", "c", "d", "e", "f"], 1);
var q3 = new Question("Please choose 2", ["a", "b", "c", "d", "e", "f"], 2);
var q4 = new Question("Please choose 3", ["a", "b", "c", "d", "e", "f"], 3);
var q5 = new Question("Please choose 4", ["a", "b", "c", "d", "e", "f"], 4);
var q6 = new Question("Please choose 5", ["a", "b", "c", "d", "e", "f"], 5);
questions = [q1, q2, q3, q4, q5, q6];
/* Question.prototype.getRandomQuestion = function() {
  randomNum = Math.floor(Math.random() * questions.le);
  num = questions[randomNum];

  console.log(num.question);
  for (var i = 0; i < num.answers.length; i++) {
    console.log(i + ": " + num.answers[i]);
  }
};
Question.prototype.isCorrect = function(answer) {
  if (parseInt(answer) === num.correct) {
    console.log("You are correct");
  } else {
    console.log("You are wrong");
  }
};

q1.getRandomQuestion();
answer = prompt("Please reply with the correct number");
q1.isCorrect(answer); */

Question.prototype.printQuestion = function() {
  console.log(this.question);
  for (var i = 0; i < this.answers.length; i++) {
    console.log(i + ": " + this.answers[i]);
  }
};
Question.prototype.isCorrect = function(answer) {
  if (parseInt(answer) === randomQuestion.correct) {
    console.log("You are correct");
  } else {
    console.log("You are wrong");
  }
};
randomNum = Math.floor(Math.random() * questions.length + 1);

var randomQuestion = this["q" + randomNum];

randomQuestion.printQuestion();
answer = prompt("text");
randomQuestion.isCorrect(answer);
