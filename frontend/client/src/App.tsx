import React from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { BasePageRouterR } from "./components/base-page-router";
import { persistor, store } from "./store";

const NAVER_API_KEY = process.env.REACT_APP_NAVER_MAP_API_KEY;

declare global {
    interface Window {
        naver: any;
    }
}

/**
 * @constructor App representing the current front end for our application.
 */
class App extends React.Component {
    /**
     * Renders the application with React.
     *
     * @returns {JSX.Element} The current layout of our application.
     */
    // store={store} calls upon our store (reducer) file to passed down
    // throughout the child files
    // Route path="/" has our BasePageRouterR file showcase the first
    // main path of our application.
    render(): React.ReactNode {
        return (
            <RenderAfterNavermapsLoaded
                ncpClientId={NAVER_API_KEY}
                error={<p>로딩을 실패하였습니다</p>}
                loading={<p>로딩중...</p>}
                submodules={["drawing", "geocoder"]}
            >
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Router>
                            <Route path="/" component={BasePageRouterR} />
                        </Router>
                    </PersistGate>
                </Provider>
            </RenderAfterNavermapsLoaded>
        );
    }
}

export default App;
