import "./homepage.scss";

import React from "react";



import { MapR } from "../naver-map/map";

export interface Prop {

}

export const HomepageForm = (props: Prop): JSX.Element => {
    return (
        <div className="layout">
            <MapR />
        </div>
    );
};
