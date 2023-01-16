// Router
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
// Style
import './App.scss';
import { selectUser, useAppSelector } from '../../configureStore';

// Components
import Home from '../../containers/Home/Home';
import SignIn from '../../containers/SignIn/SignIn';
import SignUp from '../../containers/SignUp/SignUp';

function App() {
  const location = useLocation();
  const user = useAppSelector(selectUser);

  return (
    <div className="App">
      {user &&
      (location.pathname === '/login' || location.pathname === '/register') ? (
        <Navigate to="/" replace />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
