import "./business-search.scss";

import React from "react";

import { Button, TableCell, TableRow } from "@material-ui/core";

import { Business } from "../../../api/kb-types";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const SearchedBusinessList: React.FC<Prop> = (props: Prop) => {
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };

    return (
        <div className="search-business">
            <TableRow className="search-business table">
                <TableCell>{props.business.business_picture}</TableCell>
                <TableCell>{props.business.business_name}</TableCell>
                <TableCell>{props.business.roadAddr}</TableCell>
                <TableCell>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="business-list button"
                        onClick={selectBusiness}
                    >
                        Select Business
                    </Button>
                </TableCell>
            </TableRow>
        </div>
    );
};
