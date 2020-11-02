import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { AddressDetail } from "../../api/kb-types";
import "./address.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    address: AddressDetail;
    handleSelectAddressClick: (address: AddressDetail) => void;
}

export const AddressTable: React.FC<Prop> = (props: Prop) => {
    const handleSelectAddressClick = () => {
        props.handleSelectAddressClick(props.address);
    };

    return (
        <div className="search-address">
            <TableRow className="search-address table">
                <TableCell>{props.address.zipNo}</TableCell>
                <TableCell>{props.address.jibunAddr}</TableCell>
                <TableCell>{props.address.roadAddr}</TableCell>
                <TableCell>{props.address.bdNm}</TableCell>
                <TableCell>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="search-address button"
                        onClick={handleSelectAddressClick}
                    >
                        주소 선택
                    </Button>
                </TableCell>
            </TableRow>
        </div>
    );
};
