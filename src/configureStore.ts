import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Redux persist
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import rootSaga from './sagas/rootSaga';
// eslint-disable-next-line import/no-cycle
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['redirect', 'catalog'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectUser = (state: RootState) => state.auth.userData?.user;
export const selectToken = (state: RootState) => state.auth.userData?.jwtToken;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAllCars = (state: RootState) => state.catalog.filteredCars;
export const selectCatalogError = (state: RootState) => state.catalog.error;
export const selectCatalogLoading = (state: RootState) => state.catalog.loading;

export const selectRedirectPath = (state: RootState) => state.redirect.redirect;

export default store;
