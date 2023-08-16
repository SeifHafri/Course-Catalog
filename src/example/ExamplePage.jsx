/* eslint-disable  */
import React, { Component } from 'react'; // Import Component instead of useState and useEffect
import axios from 'axios';
import Leaderboard from './Leaderboard';
import ScoreCard from './ScoreCard';
import Modal from './Modal';
import "./modal.scss";

const token = 'seif2';
const userApiUrl = 'http::/localhost:9000/users/'; // Define your user API URL


class MainComponent extends Component { // Use Component instead of functional components

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      courseIds: [],
      modal: false,
      userPercentSums: {},
      gradesData: [],
      score: 0.0,
      currentUser: 'seif',
    };
  }

  componentDidMount() {
    this.calculateUserPercentSums();


    // axios.get('http://djezzy-academy.dz:8000/api/user/v1/me', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    //   .then(response => {
    //     const username = response.data.username;
    //     this.setState(currentUser, () => currentUser = username);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching username:', error);
    //   });
  }

  currentUserData({ currentUser }) {


    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/user/${currentUser}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, [currentUser]);
    calculateUserPercentSums = async () => {
      try {
        const response = await axios.get('http://djezzy-academy.dz:8000/api/courses/v1/courses/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        const courseIds = data.results?.map(course => course.id);
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
        const gradesData = [];

        for (let i = 0; i < courseIds.length; i++) {
          const courseId = courseIds[i];
          const response = await axios.get(`http://djezzy-academy.dz:8000/api/grades/v1/courses/${courseId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          gradesData.push(...response.data.results);
        }

        this.setState({ gradesData }, () => {
          this.updateUserPercentSums();
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    updateUserPercentSums = () => {
      const { gradesData } = this.state;
      let score = 0; // Initialize the score variable
      const userPercentSums = {};

      gradesData.forEach(result => {
        const { username, percent } = result;
        userPercentSums[username] = (userPercentSums[username] || 0) + percent;

        if (username === 'seif') {
          score = userPercentSums['seif'] + percent;
        }
      });

      this.setState({ userPercentSums, score }, () => {
        this.rankPlayers();
      });
    };

    rankPlayers = () => {
      const { userPercentSums } = this.state;
      const mappedArray = Object.entries(userPercentSums).map(([key, value]) => ({
        username: key,
        score: value,
      }));
      const sortedArray = mappedArray.sort((a, b) => b.score - a.score);

      this.setState({ rankedArray: sortedArray });
    };


    postData = async (userPercentSums) => {
      try {
        const userScores = userPercentSums;

        const users = [];

        for (const [user, score] of Object.entries(userScores)) {
          score = score * 100;
          users.push({ user, score });
        }

        console.log("posted formatted data", JSON.stringify({ users }));
        const response = await fetch(userApiUrl, {
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

    // The postData function remains unchanged in this example.

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  }

  render() {
    const { modal, userPercentSums, score } = this.state;
    return (
      <div>
        <div className={`${modal ? 'blurry' : 'app'}`}>
          {(
            <div>
              <div>
                <ScoreCard userData />
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
