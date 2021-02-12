import './homepage.scss';

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Business } from '../../api/kb-types';
import { UrlPaths } from '../base-page-router';
import { BusinessList } from './business-list';

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

    // 1. business search
    // 2. buttons with distance
    // 3. filters
    // 3-1. locations upon the selection #2
    // 3-2. table info
    // 3-3. table capacity
    // 4. business list
    // 5. discover more button

    //TODO:
    // slice(0,3) only shows first 3 businesses in the list.
    // Thus, use this function to randomize/customize the list for users

    return (
        <main id="homepage-main-container">
            <div id="homepage-row1">
                <div id="homepage-row1-container">
                    <div id="homepage-row1-text">
                        <div id="homepage-row1-text-title">
                            Find your own Space
                        </div>
                    </div>
                    <div id="homepage-row1-search-container">
                        <input type="text" id="homepage-row1-search-container-search-bar-input" placeholder="Search for a space title"/>
                        <div id="homepage-row1-search-container-search-button">
                            <img
                                id="homepage-row1-search-container-search-button-icon"
                                src="/side-nav-search.png"
                                alt="kbsignup"
                                // onClick={redirectToPage}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id="homepage-row2">
                <div id="homepage-row2-container">
                    <div id="homepage-row2-text">
                        <div id="homepage-row2-text-title">거리별 공간 찾기</div>
                    </div>
                    <div id="homepage-row2-distance">
                        <button id="homepage-row2-distance-button" onClick={redirectToDiscoverPage}>
                            <img
                                id="homepage-row2-distance-button-icon"
                                src="/side-nav-search.png"
                                alt="뚜벅이"
                            />
                            <div id="homepage-row2-distance-button-distance"> (~100m) </div>
                        </button>
                        <button id="homepage-row2-distance-button" onClick={redirectToDiscoverPage}>
                            <img
                                id="homepage-row2-distance-button-icon"
                                src="/side-nav-search.png"
                                alt="따릉이"
                            />
                            <div id="homepage-row2-distance-button-distance"> (100m~500m) </div>
                        </button>
                        <button id="homepage-row2-distance-button" onClick={redirectToDiscoverPage}>
                            <img
                                id="homepage-row2-distance-button-icon"
                                src="/side-nav-search.png"
                                alt="붕붕이"
                            />
                            <div id="homepage-row2-distance-button-distance"> (500m~1km) </div>
                        </button>
                        <button id="homepage-row2-distance-button" onClick={redirectToDiscoverPage}>
                            <img
                                id="homepage-row2-distance-button-icon"
                                src="/side-nav-search.png"
                                alt="더보기"
                            />
                            <div id="homepage-row2-distance-button-distance"> 더 보기 </div>
                        </button>
                    </div>
                </div>
            </div>

            <div id="homepage-row3">
                <div id="homepage-row3-container">
                    <div id="homepage-row3-column2">
                        <div id="homepage-row3-column2-container">
                            <div id="homepage-row3-column2-filter-container">
                                <div id="homepage-row3-column2-filter-container-text">
                                    정렬순서
                                </div>
                                <div id="homepage-row3-column2-filter-container-filter">
                                    <input type="checkbox" id="homepage-row3-column2-filter-container-filter-checkbox" name="ratings"/>
                                    <label id="homepage-row3-column2-filter-container-filter-text" htmlFor="ratings">별점순</label>
                                </div>
                                <div id="homepage-row3-column2-filter-container-filter">
                                    <input type="checkbox" id="homepage-row3-column2-filter-container-filter-checkbox" name="name"/>
                                    <label id="homepage-row3-column2-filter-container-filter-text" htmlFor="name">이름순</label>
                                </div>
                            </div>
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
                    </div>
                </div>
            </div>

            <div id="homepage-row4">
                <button id="homepage-row4-button" onClick={redirectToDiscoverPage}>
                    <img
                        id="homepage-row4-button-icon"
                        src="/side-nav-search.png"
                        alt="지도로 보기"
                    />
                    <div id="homepage-row4-button-text"> 지도로 보기 </div>
                </button>
            </div>
        </main>
    );
};
