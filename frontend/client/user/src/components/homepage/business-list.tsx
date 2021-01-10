import React from "react";
import { Business } from "../../api/kb-types";
import "./homepage.scss";

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
        <div id="homepage-row2-business-detail">
            <div id="homepage-row2-business-detail-container" onClick={selectBusiness}>
                <img
                    src={`${process.env.REACT_APP_API_BASE_URL}${props.business.business_picture}`}
                    alt="No pic yet"
                    id="homepage-row2-buseinss-picture"
                />
                <div id="homepage-row2-business-detail-info-container">
                    <div id="homepage-row2-business-container-1">
                        <div id="homepage-row2-business-text-container">
                            <div id="homepage-row2-business-name">
                                {props.business.business_name}
                            </div>
                            <div id="homepage-row2-business-location">location</div>
                        </div>
                        <img
                            id="homepage-row2-business-fav"
                            src="/side-nav-favorite.png"
                            alt="fav"
                        />
                    </div>
                    <div id="homepage-row2-business-container-2">
                        <div id="homepage-row2-business-review">review</div>
                        <button id="homepage-row2-business-view-detail">상세보기</button>
                    </div>
                    <div id="homepage-row2-business-container-3">
                        <div id="homepage-row2-business-availablity">available</div>
                        <button id="homepage-row2-business-reserve">예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
