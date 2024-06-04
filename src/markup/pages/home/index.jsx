import React from "react";
import { Link } from "react-router-dom";

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

export default class Home extends React.Component {
    render() {
        return (
            <header className="App-header">
                <img src={require("../../../assets/pic1.png")} className="App-logo" alt="logo" style={styles.logo} />
                <p data-testid="test-bonjour">
                    Bonjour ! 👋
                </p>
                <span class="pikachu-button" style={styles.wrapper}>
                    <Link to="/page-1">
                        <img src={require("../../../assets/ball_blue.png")} className="img-shake" alt="blue pokeball" style={styles.ball} />
                    </Link>
                    <Link to="/page-2">
                        <img src={require("../../../assets/ball_jaune.png")} className="img-shake" alt="yellow pokeball" style={styles.ball} />
                    </Link>
                    <Link to="/page-3">
                        <img src={require("../../../assets/ball_rose.png")} className="img-shake" alt="pink pokeball" style={styles.ball} />
                    </Link>
                </span>
            </header>
        )
    }
}