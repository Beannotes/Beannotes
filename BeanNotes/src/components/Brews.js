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
      <div className="brew-card">
        {brews.map((brew) => (
          <div key={brew.id}>
            <div className="brew-details">
              <h3><strong>{brew.coffeeType}</strong></h3>
              <p><strong>Coffee Amount:</strong> {brew.coffeeAmount}{' g'}</p>
              <p><strong>Water Amount:</strong> {brew.waterAmount}{' g'}</p>
              <p><strong>Temperature:</strong> {brew.temperature}{' C'}</p>
              <p><strong>Time Taken:</strong> {formatTime(brew.timeTaken)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrewList
