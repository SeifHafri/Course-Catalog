/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';
import ScoreCard from './ScoreCard';
import Modal from './Modal';
import "./modal.scss";

const token = 'seif2';

function MainComponent() {
  const [courses, setCourses] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [users, setUsers] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [userScores, setUserScores] = useState([]);
  const [consolidatedPercentages, setConsolidatedPercentages] = useState({});
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [sumOfPercentages, setSumOfPercentages] = useState({});

  const [userList, setUserList] = useState([]);

  const [userPercentSums, setUserPercentSums] = useState({});

  useEffect(() => {

    fetchUsers();
    calculateUserPercentSums();
    //console.log("userPercentSums", userPercentSums);

  }, [courseIds]);



  const fetchCourses = async () => {

  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://djezzy-academy.dz:8000/api/enrollment/v1/enrollments/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      const userNames = data.results.map(item => item.user);
      const uniqueUsers = Array.from(new Set(userNames));
      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const calculateUserPercentSums = async () => {
    try {
      const response = await axios.get('http://djezzy-academy.dz:8000/api/courses/v1/courses/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      const courseIds = data.results?.map(course => course.id);
      //console.log("correct courseids", courseIds);
      setCourseIds(courseIds);
    } catch (error) {
      console.error('Error:', error);
    }
    try {
      const promises = courseIds.map(async courseId => {
        const response = await axios.get(`http://djezzy-academy.dz:8000/api/grades/v1/courses/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("data results", response.data.results);
        const data = response.data.results;


        data.forEach(result => {
          const { username, percent } = result;
          setUserPercentSums(prevState => ({
            ...prevState,
            [username]: (prevState[username] || 0) + percent,
          }));
        });

        console.log("data2", userPercentSums);
      });


    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className={`${modal ? 'blurry' : 'app'}`}>
        {(
          <div>
            <div>
              <ScoreCard score={900} />

              <Leaderboard players={users} userScores={userScores} />

            </div>
            <div className='messageDaily'>
              <p>Revenez chaque jour pour gagner des points supplementaires !</p>
            </div>
            <div className='spin-container'>
              <button onClick={toggleModal} className='spin-btn btn-modal'>Spin to Win !</button>
            </div>
          </div>
        )}
      </div>
      {modal && (<Modal modal={modal} toggleModal={toggleModal} />)}
    </div>
  );
}

export default MainComponent;
