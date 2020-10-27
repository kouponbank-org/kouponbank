import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import "./business-table.scss";

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    business_name: string;
    business_email: string;
    description: string;
    business_picture: string;
    selectBusiness: (business) => void;
}

export const BusinessTable = (props: Prop) => { 
    const selectBusiness = (event) => {
        const business = {
            business_name: props.business_name,
            business_email: props.business_email,
            description: props.description
        }
        props.selectBusiness(business)
        event.preventDefault()
    }
    
    return ( 
        <div className="business-list">
            <TableRow className="business-list table">
                <TableCell>{props.business_name}</TableCell>
                <TableCell>{props.business_email}</TableCell>
                <TableCell>{props.description}</TableCell>
                <TableCell>{props.business_picture}</TableCell>
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
    )
}
