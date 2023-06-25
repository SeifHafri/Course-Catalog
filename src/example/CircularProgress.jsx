/* eslint-disable */
import React from 'react';
import './index.scss'; // Import the CSS file

const CircularProgress = ({ progress, score }) => {
    const circleStyle = {
        strokeDasharray: `${progress} 100`,
    };

    return (
        <div className="circular-progress">
            <svg viewBox="0 0 100 100">
                <circle
                    className="progress-bar"
                    cx="50"
                    cy="50"
                    r="45"
                    style={circleStyle}
                />
            </svg>
            <div className="score">{score} Pts</div>
            <div className='level'>Gold</div>
        </div>
    );
};

export default CircularProgress;