import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page1() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);

    useEffect(() => {
        fetchQuestion();
    }, [questionNumber]);

    const fetchQuestion = async () => {
        try {
            if (questionNumber >= 5) return;

            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
            const randomPokemon = response.data.results[Math.floor(Math.random() * response.data.results.length)];
            const pokemonResponse = await axios.get(randomPokemon.url);
            const { name, types } = pokemonResponse.data;
            setQuestion(`What type is ${name}?`);
            const options = types.map(type => type.type.name);
            setOptions(options);
            setCorrectAnswer(options[0]);
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedAnswer(option);
        if (option === correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setQuestionNumber(prev => prev + 1);
    };

    const handleRestartQuiz = () => {
        setQuestion("");
        setOptions([]);
        setCorrectAnswer("");
        setSelectedAnswer(null);
        setScore(0);
        setQuestionNumber(0);
    };

    useEffect(() => {
        if (questionNumber < 5) fetchQuestion();
    }, [questionNumber]); 

    return (
        <>
            <header className="App-header">
                <div>
                    <h1>Pokémon Quiz</h1>
                    {questionNumber < 5 ? (
                        <>
                            <h2>{question}</h2>
                            <div>
                                {options.map((option, index) => (
                                    <button
                                        className="bt-quizz"
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {selectedAnswer !== null && (
                                <div>
                                    {selectedAnswer === correctAnswer ? (
                                        <p>Correct!</p>
                                    ) : (
                                        <p>Incorrect! The correct answer is {correctAnswer}.</p>
                                    )}
                                    <button className="bt-next-q" onClick={handleNextQuestion}>Next Question</button>
                                </div>
                            )}
                            <p>Score: {score}</p>
                        </>
                    ) : (
                        <div>
                            <h2>Quiz Finished!</h2>
                            <p>Your final score is: {score}</p>
                            <button className="bt-restart" onClick={handleRestartQuiz}>Restart Quiz</button>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}