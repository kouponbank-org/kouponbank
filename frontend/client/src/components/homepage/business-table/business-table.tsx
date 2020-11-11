import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Business } from "../../../api/kb-types";
import { BusinessActionType } from "../../../store/business/action-type";
import { Action as BusinessAction } from "../../../store/business/business-reducer";
import "./business-table.scss";
import { RootReducer } from "../../../store/reducer";

export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
    setBusinessPage: (business: Business) => void;
}

export const BusinessTable = (props: Prop): JSX.Element => {
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };
    // TODO: SET CORRECT BUSINESS LOCATION.
    // const setBusinessPage = (business) => {
    // }
    
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
                        사업장 선택
                    </Button>
                </TableCell>
            </TableRow>
        </div>
    )
}

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        business: state.businessReducer.business,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<BusinessAction>) => {
    return {
        setBusinessPage: (business: Business) =>
            dispatch({ type: BusinessActionType.SetBusinessSuccess, business: business }),
    };
};

export const BusinessTableR = connect(null, mapDispatchToProps)(BusinessTable);
