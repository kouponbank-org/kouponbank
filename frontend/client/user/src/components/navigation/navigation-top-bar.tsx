import "./navigation-bar.scss";
import { SearchQueries } from "../../api/kb-types";
import { useHistory } from "react-router-dom";
import { UrlPaths } from "../base-page-router";
import React, { useState, ReactElement } from "react";

export interface Prop {
    searchQueries: SearchQueries;
}

export const TopNavBar = (): ReactElement => {
    const history = useHistory();

    // FOR: allow user to input searching queries
    // When users type in the information, it will store inputs as a form of SearchQueries form kb-types.
    const [searchQueries, setSearchQueries] = useState<SearchQueries>();
    const searchInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setSearchQueries({
            ...searchQueries,
            [target.name]: target.value,
        });
    };

    // FOR: users to click the search button
    // When users click the button, it will send the input to the server and return the results.
    const searchButton = () => {
        history.push(UrlPaths.DiscoverPage);
    };

    //TODO:
    // need to set up the time picker
    // Need to consider condition of earliest opening and lastest closing hour range of businesses? disabling whe nothings open
    return (
        <div id="nav-top-bar-container">
            <div id="nav-top-bar-padding-control-container">
                <div id="nav-top-bar-location">
                    <div id="nav-top-bar-label">WHERE</div>
                    <input
                        type="text"
                        id="nav-top-bar-location-input"
                        name="location"
                        placeholder="위치 | Location"
                        onChange={searchInput}
                    />
                </div>
                <div id="nav-top-bar-starting-time">
                    <div id="nav-top-bar-label">CHECK-IN</div>
                    <input
                        type="datetime-local"
                        id="nav-top-bar-starting-time-input"
                        name="starting-time"
                        placeholder="시작시간 | Starting time"
                        onChange={searchInput}
                    />
                </div>
                <div id="nav-top-bar-duration">
                    <div id="nav-top-bar-label">PERIOD</div>
                    <input
                        type="time"
                        id="nav-top-bar-duration-input"
                        step={1800}
                        name="period"
                        placeholder="이용시간 | Period"
                        onChange={searchInput}
                    />
                </div>
                <div id="nav-top-bar-guest">
                    <div id="nav-top-bar-label">GUESTS</div>
                    <input
                        type="number"
                        id="nav-top-bar-guest-input"
                        min={1}
                        name="people"
                        placeholder="인원 | People"
                        onChange={searchInput}
                    />
                </div>
                <button id="nav-top-bar-button" onClick={searchButton}>
                    Search
                </button>
            </div>
        </div>
    );
};
