import React, { Component } from 'react';
import { animateScroll } from 'react-scroll';

export default class BackToTop extends Component {

    scrollToTop = () => {
        animateScroll.scrollToTop();
    }
    componentDidMount = () => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > this.state.offset) {
                this.setState({
                    ...this.state,
                    show: true
                })
            }
            else {
                this.setState({
                    ...this.state,
                    show: false
                })
            }
        })
    }
    state = {
        // before he was to 1000 @melissa 25/11/22
        offset: this.props.offset || 500,
        show: false
    }
    
    render() {
        return (
            <>
                {this.state.show && (
                    <button className="back-to-top" type="button" onClick={this.scrollToTop}>
                        <i className="fa fa-chevron-up"></i>
                    </button>
                )}
            </>
        );
    }
}