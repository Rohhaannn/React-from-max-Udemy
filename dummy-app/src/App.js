import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect (() => { 
    //this anonymous func will run only once, and this updates the state only when dependencies changed
    const storeUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storeUserLoggedInInformation === '1') { 
      setIsLoggedIn(true);
    }
  }, [] /*this square bracket is for dependencies */);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
        <MainHeader />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    
  );
}

export default App;
