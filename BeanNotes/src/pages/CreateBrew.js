import React, { useState, useEffect } from 'react';
import { doc, setDoc, collection, addDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const CreateBrew = () => {
  const { user } = UserAuth();
  const [coffeeAmount, setCoffeeAmount] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [temperature, setTemperature] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [coffeeType, setCoffeeType] = useState('');
  const [previousEntries, setPreviousEntries] = useState([]);

  useEffect(() => {
    // Fetch previous entries from Firestore
    const fetchPreviousEntries = async () => {
      const entriesQuery = query(collection(db, `users/${user.uid}/brews`));
      const entriesSnapshot = await getDocs(entriesQuery);
      const entriesData = entriesSnapshot.docs.map((doc) => doc.data().coffeeType);
      setPreviousEntries(entriesData);
    };

    fetchPreviousEntries();
  }, [user.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalTimeInSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

    const brew = {
      coffeeAmount,
      waterAmount,
      temperature,
      timeTaken: totalTimeInSeconds,
      coffeeType,
    };

      // Check if required fields are filled
    if (!coffeeType || !coffeeAmount || !waterAmount || !temperature || !minutes || !seconds) {
      console.error("Please fill in all required fields");
      return;
    }


    try {
      // Add the brew object to Firestore with the user's UID as part of the path
      await addDoc(collection(db, `users/${user.uid}/brews`), brew);

      // Update the list of previous entries
      setPreviousEntries((prevEntries) => [...prevEntries, coffeeType]);

      // Clear the input fields after submission
      setCoffeeAmount('');
      setWaterAmount('');
      setTemperature('');
      setMinutes('');
      setSeconds('');
      setCoffeeType('');

      console.log("Brew document written");
    } catch (error) {
      console.error("Error adding brew document: ", error);
    }
  };

  return (
    <div className="brew-page">
      <h1>Record a brew</h1>
      <form className="brew-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Coffee Type:
            <div>
              <input
                type="text"
                value={coffeeType}
                onChange={(e) => setCoffeeType(e.target.value)}
                placeholder="Type or select from the list"
              />
              <select
                value={coffeeType}
                onChange={(e) => setCoffeeType(e.target.value)}
              >
                <option value="" disabled>Select a coffee type</option>
                {previousEntries.map((entry, index) => (
                  <option key={index} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
        <div className="form-group">
          <label>
            Coffee Amount (g):
            <input
              type="number"
              value={coffeeAmount}
              onChange={(e) => setCoffeeAmount(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Water Amount (g):
            <input
              type="number"
              value={waterAmount}
              onChange={(e) => setWaterAmount(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Temperature (°C):
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBrew;
