import React from "react";
import { MapR } from "../naver-map/map";
import "./homepage.scss";

export const HomepageForm = (): JSX.Element => {
    return (
        <div className="layout">
            <MapR />
        </div>
    );
};
