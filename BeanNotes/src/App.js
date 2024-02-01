import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Signin from './pages/Signin';
import CreateBrew from './pages/CreateBrew';
import AddEquipment from './pages/AddEquipment';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          <Route path='/create' element={<CreateBrew />} />
          <Route path='/addequipment' element={<AddEquipment />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;