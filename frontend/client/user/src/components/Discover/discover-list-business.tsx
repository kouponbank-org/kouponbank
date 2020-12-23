import React from "react";
import { useHistory } from "react-router-dom";
import { Business } from "../../api/kb-types";
import "./discover-page.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
}

export const DiscoverBusinessList = (props: Prop): JSX.Element => {
    const history = useHistory();
    // FOR: DiscoverBusinessList
    // If the user clicks on the business image, it will direct them to the business page
    const directToBusinessPage = (event: React.MouseEvent<HTMLElement>) => {
        history.push(`/business/${props.business.id}`);
        event.preventDefault();
    };

    return (
        <div className="business-container">
            <div className="business-title">
                {
                    /*props.business.business_name*/
                    `Space Title`
                }
            </div>
            <div className="business-description">
                {
                    /*props.business.description*/ 
                    `Space Inform here - 
                    "Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.`
                }
            </div>
            <img 
                className="business-picture"
                src={`${process.env.REACT_APP_API_BASE_URL}/media/testing/cafe-2.jpg`}
                onClick={directToBusinessPage}
            />
        </div>
    );
};
