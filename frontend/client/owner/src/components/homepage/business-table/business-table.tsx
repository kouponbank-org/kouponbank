import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { Business } from "../../../api/kb-types";
import "./business-table.scss";

export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const BusinessTable = (props: Prop): JSX.Element => {
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };

    return (
        <div className="business-list">
            <TableRow className="business-list table">
                <TableCell>{props.business.business_name}</TableCell>
                <TableCell>{props.business.business_email}</TableCell>
                <TableCell>{props.business.description}</TableCell>
                <TableCell>{props.business.business_picture}</TableCell>
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