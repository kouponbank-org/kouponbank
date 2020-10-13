import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: "root",
    storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

export { store, persistor };

