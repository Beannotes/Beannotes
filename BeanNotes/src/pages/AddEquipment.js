import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const AddEquipment = () => {
  const { user } = UserAuth();
  const [equipmentType, setEquipmentType] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [brand, setBrand] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!equipmentType || !equipmentName || !brand) {
      console.error("Please fill in all required fields");
      return;
    }

    const equipment = {
      equipmentType,
      equipmentName,
      brand,
    };

    try {
      // Add the equipment object to Firestore with the user's UID as part of the path
      await addDoc(collection(db, `users/${user.uid}/equipment`), equipment);

      // Clear the input fields after submission
      setEquipmentType('');
      setEquipmentName('');
      setBrand('');

      console.log("Equipment document written");
    } catch (error) {
      console.error("Error adding equipment document: ", error);
    }
  };

  return (
    <div className="equipment-page">
      <h1>Add Coffee Brewing Equipment</h1>
      <form className="equipment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Equipment Type:
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
            >
              <option value="" disabled>Select equipment type</option>
              <option value="brewer">Brewer</option>
              <option value="grinder">Grinder</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Equipment Name:
            <input
              type="text"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Brand:
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Equipment</button>
      </form>
    </div>
  );
};

export default AddEquipment;
