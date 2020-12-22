import React from "react";
import { Business } from "../../api/kb-types";
import "./discover-page.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
}

export const DiscoverBusinessList: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="business">
            <div className="business title">
                {props.business.business_name}
            </div>
            <div className="business description">
                {props.business.description}
            </div>
            <img 
                className="business picture"
                src={`${process.env.REACT_APP_API_BASE_URL}${props.business.business_picture}`}
            />
        </div>
    );
};
