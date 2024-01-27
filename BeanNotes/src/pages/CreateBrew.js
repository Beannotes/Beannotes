import React, { useState } from 'react';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const CreateBrew = () => {
  const { user } = UserAuth();
  const [coffeeAmount, setCoffeeAmount] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [temperature, setTemperature] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalTimeInSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    // You can handle the form submission logic here
    const brew = {
      coffeeAmount,
      waterAmount,
      temperature,
      timeTaken: totalTimeInSeconds,
    };
    try {
      // Add the brew object to Firestore with the user's UID as part of the path
      await addDoc(collection(db, `users/${user.uid}/brews`), brew);

      console.log("Brew document written");
    } catch (error) {
      console.error("Error adding brew document: ", error);
    }
  };

  return (
    <div>
      <h1>Brew Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Coffee Amount (g):
          <input
            type="number"
            value={coffeeAmount}
            onChange={(e) => setCoffeeAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Water Amount (g):
          <input
            type="number"
            value={waterAmount}
            onChange={(e) => setWaterAmount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Temperature (°C):
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </label>
        <br />
        <label>
          Time Taken:
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBrew;