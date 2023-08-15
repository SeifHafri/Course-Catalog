/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from './CircularProgress'; // Make sure to import your CircularProgress component
import ConvertModal from './ConvertModal'
function ScoreCard({ score }) {
    const [currentUsername, setCurrentUsername] = useState('');
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(prevModal => !prevModal);
    };

    const token = 'seif1';

    useEffect(() => {
        axios.get('http://djezzy-academy.dz:8000/api/user/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                const username = response.data.username;
                setCurrentUsername(username);
            })
            .catch(error => {
                console.error('Error fetching username:', error);
            });
    }, []);

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
                        {currentUsername}
                    </h3>
                </div>
                <div className='Column'>
                    <CircularProgress progress={260} score={score} />
                </div>

                <div className='column'>
                    <button onClick={toggleModal} className="responsive-button">Convertir en cadeaux !</button>
                </div>
                <div className='column' id='img-col'>
                    <img src="./assets/gift.png" alt="Cadeau" />
                </div>
            </div>
            {modal && <ConvertModal modal={modal} toggleModal={toggleModal} />}
        </div>
    );
}

export default ScoreCard;