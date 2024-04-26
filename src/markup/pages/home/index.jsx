import React from "react";

// Picture 
import logo from "../../../assets/pic1.png";

// Style 
const styles = ({
    logo: {
        height: "27vmin"
    }
});

export default function Index() {
    return (
        <>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" style={styles.logo} />
                <p>
                    Bonjour ! 👋
                </p>
                <a class="pikachu-button" href="/page-1" rel="noopener noreferrer">
                    Attrape ton pokémon 
                </a>

            </header>
        </>
    )
}