import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import "./address.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    jibunAddress: string;
    roadAddress: string;
    buildingName: string;
    zipcode: string;
    selectedAddress: (address) => void;
}

export const AddressTable = (props: Prop) => { 
    const selectedAddress = (event) => {
        const addr = {
            jibunAddress: props.jibunAddress,
            roadAddress: props.roadAddress,
            zipcode: props.zipcode
        }
        props.selectedAddress(addr)
        event.preventDefault()
    }
    
    return ( 
        <div className="search-address">
            <TableRow className="search-address table">
                <TableCell>{props.zipcode}</TableCell>
                <TableCell>{props.jibunAddress}</TableCell>
                <TableCell>{props.roadAddress}</TableCell>
                <TableCell>{props.buildingName}</TableCell>
                <TableCell>
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="search-address button"
                        onClick={selectedAddress}
                    >
                        주소 선택
                    </Button>
                </TableCell>
            </TableRow>
        </div>
    )
}