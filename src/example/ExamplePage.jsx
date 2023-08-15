/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';
import ScoreCard from './ScoreCard';

import Modal from './Modal';
import "./modal.scss";

const token = 'seif2';
var counter = 0;

class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      courseIds: [],
      modal: false,
      userPercentSums: {},
      gradesData: [],
      score: 0.0,
    };
  }

  componentDidMount() {

    this.fetchCourses();
    this.calculateUserPercentSums();

  }

  fetchCourses = async () => {
    // Your fetch courses logic here
  }

  fetchUsers = async () => {
    // Your fetch users logic here
  }

  calculateUserPercentSums = async () => {


    try {
      const response = await axios.get('http://djezzy-academy.dz:8000/api/courses/v1/courses/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      const courseIds = data.results?.map(course => course.id);
      //console.log("correct courseids", courseIds);
      this.setState({ courseIds }, () => {
        this.processGradesData();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  processGradesData = async () => {

    const { courseIds } = this.state;

    try {

      for (let i = 0; i < courseIds.length; i++) {
        const courseId = courseIds[i];
        const response = await axios.get(`http://djezzy-academy.dz:8000/api/grades/v1/courses/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const gradesData = response.data.results;
        this.setState({ gradesData }, () => {
          this.updateUserPercentSums();
        });

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  updateUserPercentSums = () => {
    const { gradesData } = this.state;
    const { userPercentSums } = this.state;
    let score = null; // Initialize the score variable

    gradesData.forEach(result => {
      const { username, percent } = result;
      this.setState(prevState => ({
        userPercentSums: {
          ...prevState.userPercentSums,
          [username]: (prevState.userPercentSums[username] || 0) + percent,
        }
      }));
      if (username === 'seif') {
        score = (userPercentSums['seif'] || 0) + percent;
      }

    });

    this.setState({ score });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  render() {
    const { modal, userPercentSums } = this.state;

    //console.log("userPercentSums", userPercentSums);
    return (
      <div>
        <div className={`${modal ? 'blurry' : 'app'}`}>
          {(
            <div>
              <div>
                <ScoreCard score={this.state.score * 100} />
                <Leaderboard userScores={userPercentSums} />
              </div>
              <div className='messageDaily'>
                <p>Revenez chaque jour pour gagner des points supplementaires !</p>
              </div>
              <div className='spin-container'>
                <button onClick={this.toggleModal} className='spin-btn btn-modal'>Spin to Win !</button>
              </div>
            </div>
          )}
        </div>
        {modal && (<Modal modal={modal} toggleModal={this.toggleModal} />)}
      </div>
    );
  }
}

export default MainComponent;
