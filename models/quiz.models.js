const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  answers: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ]
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  questions: [questionSchema]
});

const Quiz = mongoose.model("Quiz", quizSchema);
const Question = mongoose.model("Question", questionSchema);
module.exports = {Quiz, Question}