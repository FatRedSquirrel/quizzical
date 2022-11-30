import React, {useState, useEffect} from "react";
import './App.css';
import Modal from './components/Modal'
import Question from "./components/Question";
import {nanoid} from 'nanoid';
import {shuffle} from "./util";

function App() {

    const [restart, setRestart] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [loadingNewQuestions, setLoadingNewQuestions] = useState(false);

    const [questions, setQuestions] = useState([]);

    //Getting data
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=50")
            .then(resp => resp.json())
            .then(data => setQuestions(createQuestionsObjects(shuffle(data.results).slice(0, 5))))
            .then(() => {
                setIsGameOver(false);
                setIsGameStarted(true);
                setCorrectAnswers(0);
            })
    }, [restart])

    //Создание объектов вопросов
    function createQuestionsObjects(data) {
        const questions = [];
        for (let item of data) {
            const correctAnswer = {
                id: nanoid(),
                body: item.correct_answer,
                correct: true,
                isChosen: false
            }
            const incorrectAnswers = item.incorrect_answers.map(answer => {
                return {
                    id: nanoid(),
                    body: answer,
                    correct: false,
                    isChosen: false
                }
            })
            const answers = [correctAnswer, ...incorrectAnswers];
            questions.push({
                id: nanoid(),
                question: item.question,
                answers: shuffle(answers)
            })
        }
        return questions;
    }

    const questionElements = questions.map(question =>
        <Question
            key={question.id}
            question={question.question}
            answers={question.answers}
            chooseAnswer={(event) => chooseAnswer(event, question.id)}
            isGameOver={isGameOver}
        />
    )

    function chooseAnswer(event, id) {
        setQuestions(prevState => {
            return prevState.map(question => {
                if (question.id === id) {
                    return {
                        ...question,
                        answers: question.answers.map(answer => {
                            if (answer.id === event.target.id) {
                                return {
                                    ...answer,
                                    isChosen: !answer.isChosen
                                }
                            }
                            return {
                                ...answer,
                                isChosen: false
                            };
                        })
                    }
                }
                return question;
            })
        })
    }

    function finishGame() {
        setIsGameOver(true);
        setLoadingNewQuestions(false);
        for (let question of questions) {
            for (let answer of question.answers) {
                if (answer.correct && answer.isChosen) {
                    setCorrectAnswers(prevState => prevState + 1);
                }
            }
        }
    }

    function restartGame() {
        setRestart(prevState => !prevState);
        setLoadingNewQuestions(true)
    }

    return (
        <div className="app">
            {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)}/>}
            {!isModalOpen && !isGameStarted && <div className="loading">LOADING...</div>}
            {isGameStarted && !isModalOpen &&
                <main className="main">
                    <div className="questions">{questionElements}</div>
                    {!isGameOver &&
                        <button
                            onClick={finishGame}
                            className="button button-additional">
                            Check answers
                        </button>
                    }
                    {isGameOver &&
                        <div className="results">
                            {!loadingNewQuestions && <p className="score">You scored {correctAnswers}/5 correct answers</p>}
                            {loadingNewQuestions && <p className="loading-new-questions">Loading...</p>}
                            {!loadingNewQuestions && <button onClick={restartGame} className="button button-additional">Play Again</button>}
                        </div>
                    }
                </main>
            }
        </div>
    );
}

export default App;
