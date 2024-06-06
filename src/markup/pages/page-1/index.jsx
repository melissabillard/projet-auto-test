import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Page1() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [pokemonImage, setPokemonImage] = useState("");

    useEffect(() => {
        fetchQuestion();
    }, [questionNumber]);

    const fetchQuestion = async () => {
        try {
            if (questionNumber >= 5) return;

            let firstType, secondType;
            const response = await axios.get(process.env.REACT_APP_API_URL);
            const randomPokemon = response.data.results[Math.floor(Math.random() * response.data.results.length)];
            const pokemonResponse = await axios.get(randomPokemon.url);
            const { name, types, sprites } = pokemonResponse.data;

            // S'assurer qu'il y a au moins deux types
            if (types.length >= 2) {
                firstType = types[0].type.name;
                secondType = types[1].type.name;
            } else {
                firstType = types[0].type.name;
                const newRandomPokemon = response.data.results[Math.floor(Math.random() * response.data.results.length)];
                const newPokemonResponse = await axios.get(newRandomPokemon.url);
                const newTypes = newPokemonResponse.data.types;
                secondType = newTypes[0].type.name;
            }

            setQuestion(`What type is ${name}?`);
            setOptions([firstType, secondType]);
            setCorrectAnswer(firstType);
            setPokemonImage(sprites.front_default); // URL de l'image frontale du Pokémon
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
                    <img src={require("../../../assets/pokemonblue.png")} style={{ width: "350px" }} alt="image titre pika bleu" />
                    <Link to="/" className="bouton-retour">Retour en arrière</Link>
                    {questionNumber < 5 ? (
                        <>
                            <h2>{question}</h2>
                            {pokemonImage && <img className="pokemon-jeu-1" src={pokemonImage} alt="Pokemon" />}
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