/* eslint-disable */
import React from 'react';
import CircularProgress from './CircularProgress';


function ScoreCard({ score }) {
    return (
        <div>
            <div className='leaderboard-title'>
                <h2>Learn to Earn !</h2>
            </div>

            <div className="screen-wide-card">
                <div className='column welcome-msg'>
                    <h3>
                        Bonjour !
                        <br />
                        Hafri Seif
                    </h3>
                </div>
                <div className='Column'>
                    <CircularProgress progress={260} score={score} />
                </div>

                <div className='column'>
                    <button className="responsive-button">Convertir en cadeaux !</button>
                </div>
                <div className='column' id='img-col'>
                    <img src="./assets/gift.png" alt="Cadeau" />

                </div>


            </div>
        </div>
    );
};

export default ScoreCard;
