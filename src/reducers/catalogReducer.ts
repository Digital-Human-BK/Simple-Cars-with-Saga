import { AnyAction } from 'redux';
import { Car } from '../interfaces/Car';
import {
  GET_CARS_REQUEST,
  GET_CARS_SUCCESS,
  GET_CARS_ERROR,
  CREATE_CAR_REQUEST,
  CREATE_CAR_SUCCESS,
  CREATE_CAR_ERROR,
  REMOVE_CAR_REQUEST,
  REMOVE_CAR_SUCCESS,
  REMOVE_CAR_ERROR,
  EDIT_CAR_REQUEST,
  EDIT_CAR_SUCCESS,
  EDIT_CAR_ERROR,
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
    // get cars
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

    // create car
    case CREATE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CAR_SUCCESS:
      return {
        cars: [action.payload, ...state.cars],
        filteredCars: [action.payload, ...state.cars],
        loading: false,
        error: null,
      };
    case CREATE_CAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // edit car
    case EDIT_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CAR_SUCCESS: {
      const updatedCars = state.cars.map((car) =>
        car.id !== action.payload.id ? car : action.payload
      );
      return {
        cars: [...updatedCars],
        filteredCars: [...updatedCars],
        loading: false,
        error: null,
      };
    }
    case EDIT_CAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // remove car
    case REMOVE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_CAR_SUCCESS: {
      const updatedCars = state.cars.filter((car) => car.id !== action.payload);

      return {
        cars: [...updatedCars],
        filteredCars: [...updatedCars],
        loading: false,
        error: null,
      };
    }
    case REMOVE_CAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default catalogReducer;
