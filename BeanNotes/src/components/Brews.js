import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const BrewList = () => {
  const [brews, setBrews] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchBrews = async () => {
      try {
        // Create a query to get brews for the current user
        const userBrewsQuery = query(
          collection(db, `users/${user.uid}/brews`)
        );

        const brewsSnapshot = await getDocs(userBrewsQuery);

        const brewsData = brewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBrews(brewsData);
      } catch (error) {
        console.error('Error fetching brews: ', error);
      }
    };

    // Only fetch brews if the user is authenticated
    if (user) {
      fetchBrews();
    } else {
      // If user is not authenticated (logged out), reset brews to an empty array
      setBrews([]);
    }

  }, [user]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  return (
    <div>
      <h2>Brew List</h2>
      <ul>
        {brews.map((brew) => (
          <li key={brew.id}>
            <strong>Coffee Amount:</strong> {brew.coffeeAmount},{' '}
            <strong>Water Amount:</strong> {brew.waterAmount},{' '}
            <strong>Temperature:</strong> {brew.temperature},{' '}
            <strong>Time Taken:</strong> {formatTime(brew.timeTaken)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrewList
