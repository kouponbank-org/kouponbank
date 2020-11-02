import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { Business } from "../../../api/kb-types";
import "./business-search.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
}

export const SearchedBusinessList: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="search-business">
            <TableRow className="search-business table">
                <TableCell>{props.business.business_picture}</TableCell>
                <TableCell>{props.business.business_name}</TableCell>
                <TableCell>{props.business.roadAddr}</TableCell>
            </TableRow>
        </div>
    );
};
