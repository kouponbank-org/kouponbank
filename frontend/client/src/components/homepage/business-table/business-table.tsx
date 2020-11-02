import { Button, TableCell, TableRow } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { ApiContext, UrlPaths } from "../../base-page-router";
import "./business-table.scss";
import { RootReducer } from "../../../store/reducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getBusiness } from "../../../store/business/business-reducer";
import { KouponBankApi } from "../../../api/kb-api";
import { User, Business } from "../../../api/kb-types";
/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    // user: User;
    businessId: string;
    business_name: string;
    business_email: string;
    description: string;
    business_picture: string;
    selectBusiness: (businessId) => void;
//     getBusiness: (
//         api: KouponBankApi,
//         userId: string,
//         businessId: string,
//     ) => Promise<Business>;
}

export const BusinessTable = (props: Prop) => { 
    const api = useContext<KouponBankApi>(ApiContext);
    const selectBusiness = (event) => {
        props.selectBusiness(props.businessId);
        // console.log(props.user.id)
        // console.log(props.businessId)
        // props.getBusiness(api, props.user.id, props.businessId);
        event.preventDefault();
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

const mapStateToProps = (state: RootReducer) => {
    console.log(state)
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
    };
};

// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//     };
// };
export const BusinessTableR = connect(mapStateToProps)(BusinessTable);