/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import ScoreCard from './ScoreCard';
import Modal from './Modal';
import "./modal.scss";

const token = 'seif2';

function UserComponent() {
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

  useEffect(() => {


    //fetch course
    fetchCourses();

    // Fetch users
    fetchUsers();

    //fetch course grades
    fetchGrades();


  },);

  const fetchGrades = async () => {
    try {
      const response = await fetch('http://djezzy-academy.dz:8000/api/grades/v1/courses/course-v1:edX+DemoX+Demo_Course', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },)
        .then((response) => response.json())
        .then((data) => {
          setUserList(data.results);
          console.log(userList);



        })
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      // Fetch courses
      fetch("http://djezzy-academy.dz:8000/api/courses/v1/courses/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },)
        .then((response) => response.json())
        .then((data) => {
          const courseIds = data.results.map(course => course.id);
          console.log("correct courseids", courseIds);

          setCourseIds(courseIds)
        })

    }
    catch {
      console.error('Error:', error);
    }
  }

  const fetchUsers = async () => {
    try {
      fetch("http://djezzy-academy.dz:8000/api/enrollment/v1/enrollments/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const userNames = data.results.map(item => item.user);
          const uniqueUsers = Array.from(new Set(data.results.map(item => item.user)));
          setUsers(uniqueUsers);

        });
    }
    catch {
      console.error('Error:', error);
    }
  }


  // Display the sum of percentages for each user

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
      {modal && (< Modal modal={modal} toggleModal={toggleModal} />)}
    </div>


  );
}

export default UserComponent;

