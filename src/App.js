import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Routes, Route } from "react-router-dom";
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice'



function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        })
        );
      } else {
        dispatch(logout())
      }
    })
    return unsub;
  }, [dispatch])


  return (
    <div className="app">

      {!user ?
        (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )
      }

    </div>
  );
}

export default App;
