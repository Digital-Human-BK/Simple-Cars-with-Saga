import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// Redux
import { selectRedirectPath, useAppSelector } from '../../configureStore';
/** Redirect to pre-selected page */
function CustomRedirect() {
  /** Object which contains parameters to next page {pathname: ... , state: ...} */
  const redirect = useAppSelector(selectRedirectPath);

  const [redirectPath, setRedirectPath] = useState(redirect);

  useEffect(() => {
    window.onpopstate = () => {
      /** Detect browser back button and reset redirectPath */
      return setRedirectPath('');
    };
    /** Update redirectPath when the state from redux appear */
    setRedirectPath(redirect);
  }, [redirect]);

  return redirectPath ? <Navigate replace to={redirectPath} /> : null;
}

export default CustomRedirect;
