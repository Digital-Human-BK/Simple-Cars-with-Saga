import { AnyAction } from 'redux';
import { Car } from '../interfaces/Car';
import {
  GET_CARS_REQUEST,
  GET_CARS_SUCCESS,
  GET_CARS_ERROR,
} from '../containers/Home/types';

interface CatalogState {
  cars: Car[];
  filteredCars: Car[];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: CatalogState = {
  cars: [],
  filteredCars: [],
  loading: false,
  error: null,
};

function catalogReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_CARS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CARS_SUCCESS:
      return {
        cars: action.payload,
        filteredCars: action.payload,
        loading: false,
        error: null,
      };
    case GET_CARS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default catalogReducer;
