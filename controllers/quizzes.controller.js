const { Quiz } = require("../models/quiz.models")

const createQuiz = async (req, res) => {
    console.log(req.body)
    try {
      const { title, creator, questions } = req.body
      const quiz = await Quiz.create({ title, creator, questions });
      res.status(201).send(quiz);
    } catch (error) {
      console.error('Error creating quiz:', error);
      res.status(400).send(error);
    }
};

const getAllQuizzes = async (req, res) => {
    try {
      const quizzes = await Quiz.find().populate('creator').populate('questions');
      res.json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getQuizById = async (req, res) => {
    const { id } = req.params;
    console.log({id})
    try {
      const quiz = await Quiz.findById(id).populate('creator').populate('questions');
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json(quiz);
    } catch (error) {
      console.error('Error fetching quiz by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateQuizById = async (req, res) => {
    const { id } = req.params;
    const { title, creator, questions } = req.body;
    try {
      const quiz = await Quiz.findByIdAndUpdate(id, { title, creator, questions }, { new: true });
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json(quiz);
    } catch (error) {
      console.error('Error updating quiz by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


const addQuestionToQuiz = async (req, res) => {
  const { id } = req.params;
  const { questionText, answers } = req.body;
  try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(id, { $push: { questions: { questionText, answers } } }, { new: true });
      if (!updatedQuiz) {
          return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json(updatedQuiz);
  } catch (error) {
      console.error('Error adding question to quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeQuestionFromQuiz = async (req, res) => {
  const { id, questionId } = req.params;
  console.log('Received Parameters:', { id, questionId });
  try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(id, { $pull: { questions: { _id: questionId } } }, { new: true });
      if (!updatedQuiz) {
          return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json(updatedQuiz);
  } catch (error) {
      console.error('Error removing question from quiz:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteQuizById = async (req, res) => {
    const { id } = req.params;
    try {
      console.log({id})
      const quiz = await Quiz.findByIdAndDelete(id);
      
      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json(quiz);
    } catch (error) {
      console.error('Error deleting quiz by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getQuizzesByUser = async (req, res) =>{
  const { id } = req.params;
  try {
    const quizzes = await Quiz.find({creator: id})
    .populate('title', 'questions')
    res.send(quizzes)
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
}

module.exports = { 
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuizById,
    addQuestionToQuiz,
    removeQuestionFromQuiz,
    deleteQuizById,
    getQuizzesByUser
};