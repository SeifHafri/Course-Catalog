/* eslint-disable */

import React from 'react';
import './convertModal.scss'; // Assuming you have a separate CSS file for your modal styles

const mockGifts = [
    { name: 'Gift 1', points: 100 },
    { name: 'Gift 2', points: 200 },
    { name: 'Gift 3', points: 300 },
];

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
                                <button className="convert-button">Convertir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Modal;