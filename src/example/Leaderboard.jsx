/* eslint-disable  */
import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import BackgroundImage from './BackgroundImage';

function Leaderboard(props) {
    const [rankedArray, setRankedArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        const rankPlayers = () => {
            const mappedArray = Object.entries(props.userScores).map(([key, value]) => ({
                username: key,
                score: value,
            }));

            const sortedArray = mappedArray.sort((a, b) => b.score - a.score);
            setRankedArray(sortedArray);
            setIsLoading(false);
        };

        rankPlayers();



        const postData = async () => {
            try {
                const userScores = props.userScores;
                const apiUrl = 'http://localhost:9000/users/';
                const users = [];

                for (const [user, score] of Object.entries(userScores)) {
                    score = score * 100;
                    users.push({ user, score });
                }

                console.log("posted formatted data", JSON.stringify({ users }));
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ users }),
                    mode: 'cors'
                });

                if (response.ok) {
                    console.log('Data posted successfully');

                    // You might want to handle success state here
                } else {
                    console.error('Error posting data');
                    // You might want to handle error state here
                }

            } catch (error) {
                console.error('An error occurred:', error);
                // You might want to handle error state here
            }

        };

        console.log('posting data ...')
        postData();


        fetch('http://localhost:9000/users/')
            .then(response => response.json())
            .then(data => {
                setUserScores(data);
            })
            .catch(error => {
                console.error('Error fetching user scores:', error);
            });

    }, [props.userScores]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className='leaderboard-title'>
                        <h2>LEADERBOARD</h2>
                        <div>
                            <button id='Filter-Btn'>Filter <FaCaretDown /></button>
                        </div>
                    </div>

                    <table className='leaderboard-table'>
                        <thead>
                            <tr>
                                <th className='th-border'>Rank</th>
                                <th className='th-border'>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankedArray.map((player, index) => (
                                <tr key={index + 1}>
                                    <td>
                                        <div className='rank'>{index + 1}</div>
                                    </td>
                                    <td>
                                        <div className='player-info'>
                                            <BackgroundImage username={player.username} />
                                            <div className='player-name'>{player.username}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='rank'>{player.score * 100}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
