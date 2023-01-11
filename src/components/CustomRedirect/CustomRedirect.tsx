import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { selectRedirectPath, useAppSelector } from '../../configureStore';

/** Redirect to pre-selected page */
function CustomRedirect() {
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

  return redirectPath ? <Navigate to={redirectPath} replace /> : null;
}

export default CustomRedirect;
