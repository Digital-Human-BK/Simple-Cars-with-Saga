import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../configureStore';

/** Redirect to pre-selected page */
function CustomRedirect() {
  /** Object which contains parameters to next page {pathname: ... , state: ...} */
  const { redirect } = useSelector((state: RootState) => state.redirect);

  const [redirectPath, setRedirectPath] = useState(redirect);

  useEffect(() => {
    window.onpopstate = () => {
      /** Detect browser back button and reset redirectPath */
      return setRedirectPath('');
    };
    /** Update redirectPath when the state from redux appear */
    setRedirectPath(redirect);
  }, [redirect]);

  return redirectPath ? <Navigate to={redirectPath} /> : null;
}

export default CustomRedirect;
