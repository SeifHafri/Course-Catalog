/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import BackgroundImage from './BackgroundImage';
import axios from 'axios';

function Leaderboard(props) {
    const [rankedArray, setRankedArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const userApiUrl = 'http://localhost:9000/users/';
    const [modifiedScores, setModifiedScores] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const modifiedScoresArray = await Promise.all(
                users.map(async (user) => {
                    const modifiedScore = await calculateModifiedScore(user);
                    console.log("modified score", modifiedScore)
                    return {
                        ...user,
                        modifiedScore
                    };
                })
            );
            console.log(modifiedScoresArray)
            setModifiedScores(modifiedScoresArray);
            setIsLoading(false);
        };





        axios.get(userApiUrl)
            .then(response => {
                const userArray = response.data.users.map(user => ({
                    user: user.user,
                    score: user.score
                }));

                setUsers(userArray);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });


        fetchData();
        //console.log(fetchData());

    }, [props.userScores]);

    const fetchUserGifts = async (username) => {
        try {
            const response = await axios.get(`http://localhost:9000/user/${username}`);
            return response.data.gifts;
        } catch (error) {
            console.error(`Error fetching gifts for ${username}:`, error);
            return [];
        }
    };


    const calculateModifiedScore = async (user) => {
        const userGifts = await fetchUserGifts(user.user);
        const giftSum = userGifts.reduce((total, gift) => total + gift.value, 0);
        return user.score - giftSum;
    };



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
                            {modifiedScores.map((player, index) => (
                                <tr key={index + 1}>
                                    <td>
                                        <div className='rank'>{index + 1}</div>
                                    </td>
                                    <td>
                                        <div className='player-info'>
                                            <BackgroundImage username={player.user} />
                                            <div className='player-name'>{player.user}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='rank'>{player.modifiedScore}</div>
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
