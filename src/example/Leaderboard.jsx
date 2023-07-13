/* eslint-disable*/
import React from 'react';
import { FaCaretDown, } from "react-icons/fa";
// Import the CSS file

function Leaderboard(props) {
    return (
        <div>

            <div className='leaderboard-title'>
                <h2>LEADERBOARD</h2>
                <div>
                    <button id='Filter-Btn'>Filter <FaCaretDown />  </button>
                </div>
            </div>

            <table className="leaderboard-table">
                <thead>
                    <tr key={props.players.id} >
                        <th className='th-border'>Rank</th>
                        <th className='th-border'>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {props.players.map((player, index) => (
                        <tr key={index + 1}>
                            <td>
                                <div className='rank'>
                                    {index + 1}
                                </div>
                            </td>
                            <td>
                                <div className='player-info'>
                                    <div className='avatar'></div>
                                    <div className='player-name'>
                                        {player}
                                    </div>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;
