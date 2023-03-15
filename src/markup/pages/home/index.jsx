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
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </>
    )
}