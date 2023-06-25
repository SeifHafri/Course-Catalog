/* eslint-disable */
import React, { useState, useRef } from "react";
import useWindowSize from "react-use-window-size";
import WheelComponent from "./wheelComponent"
import "./modal.scss";

export default function Modal({ modal, toggleModal }) {
    let [flag, setFlag] = useState(false);
    const confetiRef = useRef(null);

    const { width, height } = useWindowSize();

    const spinClicked = (value) => {
        setFlag(value);
    };
    const onFinished = (winner) => {
        console.log(winner);
    };
    const segments = ["0 pts", "1 pts", "10 pts", "2GB", "500 pts", "0  pts", '2  pts'];
    const segColors = [
        "#EF3B52",
        "#E1E8ED",
        "#EF3B52",
        "#E1E8ED",
        "#EF3B52",
        "#E1E8ED",
        "#EF3B52",
        "#E1E8ED"
    ];






    return (

        <div className="modal-2">
            <div className="overlay"></div>
            <div className="modal-content">

                <div className='modal-left'>
                    <div className="glass-card">
                        <h2 className="card-title">Spin to Win !</h2>
                        <p className="card-content">Jouer a la roulette et tenter de gagner des
                            points supplementaires a convertir en cadeaux</p>
                    </div>
                    <div className="modal-btn">
                        <button onClick={toggleModal} className='spin-btn'>Spin to Win !</button>
                    </div>
                    <div className="logo-wrapper">
                        <img src="./assets/DjezzyLogoF.png" alt="Djezzy Logo" />
                    </div>
                </div>

                <div className="App">
                    <div id="wheelCircle">
                        <WheelComponent
                            segments={segments}
                            segColors={segColors}
                            winningSegment=""
                            onFinished={(winner) => onFinished(winner)}
                            primaryColor="#FFC702"
                            primaryColoraround="#ffffffb4"
                            contrastColor="white"
                            buttonText=""
                            isOnlyOnce={false}
                            size={190}
                            upDuration={50}
                            downDuration={1000}
                        />
                    </div>
                </div>



            </div>
        </div >


    );

}