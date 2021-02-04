import './homepage.scss';

import React from 'react';

import { Business } from '../../api/kb-types';

export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const BusinessList = (props: Prop): JSX.Element => {
    // FOR: Passing the selection to Homepage.tsx
    // When the business is clicked, pass the event that it is clicked to the parent page.
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };

    return (
        <div id="homepage-row3-column2-business-list">
            <div id="homepage-row3-column2-business-detail">
                <div id="homepage-row3-column2-business-detail-container">
                    <div id="homepage-row3-column2-business-detail-container-column1">
                        <div id="homepage-row3-column2-business-detail-container-column1-title">
                            {props.business.business_name}
                        </div>
                        <div id="homepage-row3-column2-business-detail-container-column1-address">
                            {props.business.business_address.roadAddr}
                        </div>
                    </div>
                    <div id="homepage-row3-column2-business-detail-container-column2">
                        <div id="homepage-row3-column2-business-detail-container-column2-review">
                            <div id="homepage-row3-column2-business-detail-container-column2-review-icon">
                                {/* star icon */} star
                            </div>
                            <div id="homepage-row3-column2-business-detail-container-column2-review-rating">
                                {/* review rating */} 4.7
                            </div>
                        </div>
                        <button id="homepage-row3-column2-business-detail-container-column2-button1">
                            <img
                                id="homepage-row3-column2-business-detail-container-column2-button1-icon"
                                src="/side-nav-search.png"
                                alt="Quote"
                            />
                            <div id="homepage-row3-column2-business-detail-container-column2-button1-text">
                                상세보기
                            </div>
                        </button>
                        <button id="homepage-row3-column2-business-detail-container-column2-button2">
                            <img
                                id="homepage-row3-column2-business-detail-container-column2-button1-icon"
                                src="/side-nav-search.png"
                                alt="Calendar"
                            />
                            <div id="homepage-row3-column2-business-detail-container-column2-button1-text">
                                빠른예약
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
