import "./pagination.scss";

import React from "react";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    pageIndex: number;
    paginationClick: (pageIndex: number) => void;
}

export const Pagination = (props: Prop): JSX.Element => {

    const paginationClick = (event: React.MouseEvent<HTMLElement>) => {
        props.paginationClick(props.pageIndex);
        event.preventDefault();
    };

    return (
        <div id="page-button-container">
            <div id="page-button" onClick={paginationClick}>
                {props.pageIndex}
            </div>
        </div>
    );
};
