import React from "react";
import { Business } from "../../api/kb-types";
import "./homepage.scss";

export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const BusinessList = (props: Prop): JSX.Element => {
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };

    return (
        <div className="business-detail" onClick={selectBusiness}>
            <img
                src={`${process.env.REACT_APP_API_BASE_URL}${props.business.business_picture}`}
                alt="No pic yet"
                className="buseinss-picture"
                id="buseinss-picture" />   
            <div className="business-name">         
                {props.business.business_name}
            </div>
            <div className="business-text">         
                distance or # of available seats
            </div>
        </div>
    );
};