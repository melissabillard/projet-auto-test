import React from "react";

// Picture 
import logo from "../../../assets/pic1.png";
import yellowBall from "../../../assets/ball_jaune.png";
import blueBall from "../../../assets/ball_blue.png";
import pinkBall from "../../../assets/ball_rose.png";


// Style 
const styles = ({
    wrapper: {
        display: "flex",
        gap: "50px",
    },
    logo: {
        height: "27vmin"
    },
    ball: {
        width: "70px",
        height: "auto"
    }
});

export default function Home() {
    return (
        <>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" style={styles.logo} />
                <p>
                    Bonjour ! 👋
                </p>
                <span class="pikachu-button" style={styles.wrapper}>
                    <a href="/page-1">
                        <img src={blueBall} alt="blue pokeball" style={styles.ball}/>
                    </a>
                    <a href="/page-2">
                        <img src={yellowBall} alt="yellow pokeball" style={styles.ball}/>
                    </a>
                    <a href="/page-3">
                        <img src={pinkBall} alt="pink pokeball" style={styles.ball}/>
                    </a>
                </span>
            </header>
        </>
    )
}