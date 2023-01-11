import REDIRECT from '../components/CustomRedirect/types';

export const initialState = {
  redirect: '',
};

function redirectReducer(
  state = initialState,
  action: { type: string; payload: string }
) {
  switch (action.type) {
    /** Action Creator - Redirect to passed screen */
    case REDIRECT:
      return {
        redirect: action.payload,
      };
    default:
      return state;
  }
}

export default redirectReducer;
