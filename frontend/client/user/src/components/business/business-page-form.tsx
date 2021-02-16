import "./business-page.scss";

import React from "react";

import { Business } from "../../api/kb-types";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
}

export const BusinessPageForm = (props: Prop): JSX.Element => {
    return (
        <div className="business-form-container">
            <div className="business-title">{`Space Title ${props.business.business_name}`}</div>
            <div className="business-description">
                {
                    /*props.business.description*/
                    `Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.`
                }
            </div>
            <img
                className="business-picture"
                src={`${process.env.REACT_APP_API_BASE_URL}/media/testing/cafe-2.jpg`}
            />
        </div>
    );
};
