import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Business } from "../../../api/kb-types";
import "./business-table.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
    selectBusiness: (business) => void;
}

export const BusinessTable = (props: Prop): JSX.Element => {
    const history = useHistory();

    const goToBusinessPage = () => {
        history.push(`/business/${props.business.id}`);
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
                        onClick={goToBusinessPage}
                    >
                        사업장 선택
                    </Button>
                </TableCell>
            </TableRow>
        </div>
    );
};
