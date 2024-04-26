import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Page1() {

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
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
        fetchQuestion();
    };

    return (
        <>
            <header className="App-header">
                <div>
                    <h1>Pokémon Quiz</h1>
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
                </div>
            </header>
        </>
    )
}