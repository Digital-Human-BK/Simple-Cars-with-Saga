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

import SEARCH_CAR from '../components/SearchBar/types';
import SORT_CARS from '../common/SortingButtons/types';
import RESET_SORTING from '../common/SortingCriteria/types';

interface CatalogState {
  cars: Car[];
  filteredCars: Car[];
  sortedBy: string;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: CatalogState = {
  cars: [],
  filteredCars: [],
  sortedBy: 'Random',
  loading: false,
  error: null,
};

function catalogReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    // ========================
    // GETTING ALL CARS
    // ========================
    case GET_CARS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CARS_SUCCESS:
      return {
        ...state,
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

    // ========================
    // CREATING CAR
    // ========================
    case CREATE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CAR_SUCCESS:
      return {
        ...state,
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

    // ========================
    // EDITING CAR
    // ========================
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
        ...state,
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

    // ========================
    // REMOVING CAR
    // ========================
    case REMOVE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_CAR_SUCCESS: {
      const updatedCars = state.cars.filter((car) => car.id !== action.payload);

      return {
        ...state,
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

    // ========================
    // SEARCHING
    // ========================
    case SEARCH_CAR: {
      const lowerCase = action.payload.toLocaleLowerCase();
      if (lowerCase === '') {
        return {
          ...state,
          filteredCars: [...state.cars],
        };
      }
      return {
        ...state,
        filteredCars: state.cars.filter((item) => {
          return Object.values(item).some((v) =>
            v.toString().toLowerCase().includes(lowerCase)
          );
        }),
      };
    }

    // ========================
    // SORTING
    // ========================
    case SORT_CARS: {
      const { key, order } = action.payload;

      const sorted = [...state.filteredCars].sort((a, b) => {
        const valueA = a[key as keyof Car];
        const valueB = b[key as keyof Car];
        if (order === 'asc') {
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB);
          }
          return valueA < valueB ? -1 : 1;
        }
        if (order === 'desc') {
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueB.localeCompare(valueA);
          }
          return valueA > valueB ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        sortedBy: `${key} ${order}`,
        filteredCars: sorted,
      };
    }

    case RESET_SORTING: {
      return {
        ...state,
        filteredCars: [...state.cars],
        sortedBy: 'Random',
      };
    }

    default:
      return state;
  }
}

export default catalogReducer;
