import "./business-row.scss";

import React from "react";

import { Button, TableCell } from "@material-ui/core";

import { Business } from "../../../api/kb-types";

export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const BusinessRow = (props: Prop): JSX.Element => {
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };

    return (
        <div onClick={selectBusiness} className="business-list table">
            <TableCell>{props.business.business_name}</TableCell>
            <TableCell>{props.business.business_detail.business_email}</TableCell>
            <TableCell>{props.business.business_description}</TableCell>
            <TableCell>{props.business.business_detail.business_picture}</TableCell>
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
        </div>
    );
};