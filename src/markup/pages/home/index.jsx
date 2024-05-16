import React from "react";
import { Link } from "react-router-dom";

// Picture 
// import logo from "../../../assets/pic1.png";
// import yellowBall from "../../../assets/ball_jaune.png";
// import blueBall from "../../../assets/ball_blue.png";
// import pinkBall from "../../../assets/ball_rose.png";

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
        <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" style={styles.logo} /> */}
            <p data-testid="test-bonjour">
                Bonjour ! 👋
            </p>
            <span class="pikachu-button" style={styles.wrapper}>
                {/* <Link to="/page-1">
                    <img src={blueBall} className="img-shake" alt="blue pokeball" style={styles.ball} />
                </Link>
                <Link to="/page-2">
                    <img src={yellowBall} className="img-shake" alt="yellow pokeball" style={styles.ball} />
                </Link>
                <Link to="/page-3">
                    <img src={pinkBall} className="img-shake" alt="pink pokeball" style={styles.ball} />
                </Link> */}
            </span>
        </header>
    )
}