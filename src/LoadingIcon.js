import { Component } from "react";
import './LoadingIcon.css';

export default class LoadingIcon extends Component {
    render() {
        return (
            <div className="animation-container">
                <span className="animating-letter animation-m">M</span>
                <span className="animating-letter animation-d">D</span>
                <div className="animation-word">FITNESS</div>
            </div>
        );
    }
}