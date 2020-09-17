import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));