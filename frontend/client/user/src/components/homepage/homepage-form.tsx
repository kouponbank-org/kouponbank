import React from "react";
import { useHistory } from "react-router-dom";
import { UrlPaths } from "../base-page-router";
import "./homepage.scss";
import { Business } from "../../api/kb-types";
import { BusinessList } from "./business-list";

export interface Prop {
    businesses: Business[];
    selectBusiness: (businessId) => void;
}

export const HomepageForm = (props: Prop): JSX.Element => {
    const history = useHistory();

    // FOR: Redirect to discover page
    // When the button is clicked,  redirect to discover page
    const redirectToDiscoverPage = (event: React.MouseEvent<HTMLElement>): void => {
        history.push(UrlPaths.DiscoverPage);
        event.preventDefault();
    };

    //TODO:
    // slice(0,3) only shows first 3 businesses in the list.
    // Thus, use this function to randomize/customize the list for users

    return (
        <main id="homepage-main-container">
            <div id="homepage-row1">
                <div id="homepage-row1-container">
                    <div id="homepage-row1-text">
                        <div id="homepage-row1-text-title">
                            Book unique places to stay and things to do.
                        </div>
                    </div>
                </div>
            </div>
            <div id="homepage-row2">
                <div id="homepage-row2-container">
                    <div id="homepage-row2-text">
                        <div id="homepage-row2-text-title">당신을 위한 추천공간</div>
                        <div id="homepage-row2-text-subtitle">MD 추천 공간</div>
                    </div>
                    <div id="homepage-row2-business">
                        {props.businesses.slice(0, 3).map((business) => {
                            return (
                                <BusinessList
                                    key={business.id}
                                    business={business}
                                    selectBusiness={props.selectBusiness}
                                />
                            );
                        })}
                    </div>
                    <button id="homepage-row2-button" onClick={redirectToDiscoverPage}>
                        Discover More
                    </button>
                </div>
            </div>
        </main>
    );
};
