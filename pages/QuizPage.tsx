import React, { useState } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'Τι είναι τα NFTs;',
    options: ['Κρυπτονομίσματα', 'Μοναδικά ψηφιακά αντικείμενα', 'Γλώσσα Προγραμματισμού', 'Τίποτα από τα παραπάνω'],
    answerIndex: 1,
  },
  {
    question: 'Τι είναι η Κυκλική Οικονομία;',
    options: ['Η οικονομία που γυρίζει σε κύκλους', 'Άλλη ονομασία για την Γραμμική Οικονομία', 'Οικονομικό μοντέλο βασισμένο στην βιωσιμότητα', 'Τίποτα από τα παραπάνω'],
    answerIndex: 2,
  },
  {
    question: 'Σε ποια αρχή βασίζεται η Κυκλική οικονομία;',
    options: ['παραγωγή-κατανάλωση-απόρριψη', 'Ανακύκλωση', 'Παραγωγή-απόρριψη', 'Τίποτα από τα παραπάνω'],
    answerIndex: 1,
  },
  {
    question: 'Σε ποια τεχνολογία βασίζονται τα NFTs ',
    options: ['Blockchain', 'Python', 'Javascript', 'Τίποτα από τα παραπάνω'],
    answerIndex: 0,
  },
  {
    question: 'Μπορούν τα NFTs να αντικατασταθούν;',
    options: ['Ναι', 'Όχι', 'Ανάλογα πως τα δημιουργείς', 'Τίποτα από τα παραπάνω'],
    answerIndex: 1,
  },
  {
    question: 'Που αποθηκεύονται τα NFTs',
    options: ['Ψηφιακά πορτοφόλια', 'Μπορούμε στο παντελόνι μας αφού είναι εικόνες', 'Στην τράπεζα', 'Τίποτα από τα παραπάνω'],
    answerIndex: 0,
  },
];

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerClick = (selectedAnswerIndex: number) => {
    if (selectedAnswerIndex === quizQuestions[currentQuestionIndex].answerIndex) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setQuizStarted(false);
  };

  const getScoreComment = () => {
    if (score === quizQuestions.length) {
      return 'Perfect score! You nailed it!';
    } else if (score >= quizQuestions.length * 0.8) {
      return 'Great job! You did amazing!';
    } else if (score >= quizQuestions.length * 0.6) {
      return 'Well done! Keep up the good work!';
    } else if (score >= quizQuestions.length * 0.4) {
      return 'Good try';
    } else if (score >= quizQuestions.length * 0.2) {
      return 'Nice try! Keep practicing!';
    } else {
      return "Don't worry! Keep learning and try again!";
    }
  };

  return (
    <div>
      {!showScore ? (
        <div>
          {!quizStarted ? (
            <div
              style={{
                backgroundColor: 'green',
                padding: '10px',
                marginBottom: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              onClick={handleStartQuiz}
            >
              <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '14px' }}>
                Start Quiz
              </button>
            </div>
          ) : null}
          {quizStarted ? (
            <div>
              <h2>Question {currentQuestionIndex + 1}</h2>
              <p>{quizQuestions[currentQuestionIndex].question}</p>
              <div>
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'gray',
                      padding: '10px',
                      margin: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleAnswerClick(index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your score: {score}</p>
          <p>{getScoreComment()}</p>
          <div
            style={{
              backgroundColor: 'green',
              padding: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'inline-block',
            }}
            onClick={handleRestartQuiz}
          >
            <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '14px' }}>
              Take Quiz Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
