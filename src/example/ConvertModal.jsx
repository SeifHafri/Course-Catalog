/* eslint-disable */

import React from 'react';
import './convertModal.scss'; // Assuming you have a separate CSS file for your modal styles
import axios from 'axios'


const mockGifts = [
    { name: 'Gift 1', points: 100 },
    { name: 'Gift 2', points: 200 },
    { name: 'Gift 3', points: 300 },
];
function updateUserScore(user, newScore) {
    const apiUrl = `http://localhost:9000/user/${user}`;

    const updatedUser = {

        user: user,
        score: newScore
    }


    axios.put(apiUrl, updatedUser)
        .then(response => {
            console.log('Score updated successfully:', response.data);
            // You can perform additional actions after the score has been updated
        })
        .catch(error => {
            console.error('Error updating score:', error);
        });
}


function Modal({ modal, toggleModal }) {
    return (
        <div id="modal-overlay" className={`modal ${modal ? 'active' : ''}`}>
            <div className="modal-content-2">
                <button className="close-button" onClick={toggleModal}>X</button>
                <h2>Convertir vos points en Cadeaux</h2>
                <p>Choisissez votre cadeau:</p>
                <ul className="gift-list">
                    {mockGifts.map((gift, index) => (
                        <li key={index}>
                            <div className="gift-item">
                                <span className="gift-name">{gift.name}</span>
                                <span className="gift-points">{gift.points} Points</span>

                                <button className="convert-button" onClick={updateUserScore('seif', 100)} >Convertir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Modal;