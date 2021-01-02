import "./pagination.scss";

import React from "react";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    pageIndex: number;
    businessListPaginationClick: (pageIndex: number) => void;
}

export const Pagination = (props: Prop): JSX.Element => {

    const businessListPaginationClick = (event: React.MouseEvent<HTMLElement>) => {
        props.businessListPaginationClick(props.pageIndex);
        event.preventDefault();
    };

    return (
        <div id="page-button-container">
            <div id="page-button" onClick={businessListPaginationClick}>
                {props.pageIndex}
            </div>
        </div>
    );
};
