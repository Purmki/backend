const { Router } = require("express");
const { createQuiz, getQuizById, getAllQuizzes, updateQuizById, deleteQuizById, addQuestionToQuiz, removeQuestionFromQuiz, getQuizzesByUser} = require('../controllers/quizzes.controller');
const router = Router();

router.post('/', createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.patch('/:id', updateQuizById);
router.post('/:id/questions', addQuestionToQuiz);
router.delete('/:id/questions/:questionId', removeQuestionFromQuiz);
router.delete('/:id', deleteQuizById);
router.get('/userQuiz/:id', getQuizzesByUser)


module.exports = router;