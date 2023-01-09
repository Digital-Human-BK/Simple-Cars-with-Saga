// Router
import { Route, Routes, Navigate } from 'react-router-dom';
// Style
import './App.scss';
// Components
import { RootState, useAppSelector } from '../../configureStore';
import Home from '../../containers/Home/Home';
import CustomRedirect from '../CustomRedirect/CustomRedirect';
// TODO: IMPORT PAGES TO WHICH USER WILL BE REDIRECT

function App() {
  const userSessionInfo = useAppSelector((state: RootState) => state);
  const isUserLoggedIn = false;
  //= userSessionInfo.isLoggedIn;

  const windowLocation = window.location;
  const windowURL = windowLocation.pathname;

  return (
    <div className="App">
      <CustomRedirect />
      {isUserLoggedIn &&
      (windowURL === '/login' || windowURL === '/register') ? (
        <Navigate to="/cars" />
      ) : null}
      <Routes>
        {
          // TODO: Set route-s
          // 'home' is just for the example
        }
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        {/* <Navigate to="/home" /> */}
      </Routes>
    </div>
  );
}

export default App;
