import { TableCell, TableRow, Button } from "@material-ui/core";
import React from "react";
import { Business } from "../../../api/kb-types";
import "./business-search.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const SearchedBusinessList: React.FC<Prop> = (props: Prop) => {
    const selectBusiness = (business) => {
        props.selectBusiness(props.business.id);
        //history.push(`/business/${props.business.id}`);
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
                        사업장 선택
                    </Button>
                </TableCell>
            </TableRow>
        </div>
    );
};
