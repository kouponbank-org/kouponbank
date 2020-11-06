import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { Business } from "../../../api/kb-types";
import { BusinessActionType } from "../../../store/business/action-type";
import { Action as BusinessAction } from "../../../store/business/business-reducer";
import "./business-table.scss";
import { RootReducer } from "../../../store/reducer";
import { getBusiness } from "../../../store/business/business-reducer";
import { KouponBankApi } from "../../../api/kb-api";
/**
 * Represents the required properties of the log in form.
 */
// export interface Prop { 
//     // user: User;
//     businessId: string;
//     business_name: string;
//     business_email: string;
//     description: string;
//     business_picture: string;
//     selectBusiness: (businessId) => void;
// //     getBusiness: (
// //         api: KouponBankApi,
// //         userId: string,
// //         businessId: string,
// //     ) => Promise<Business>;
// }

// export const BusinessTable = (props: Prop) => { 
//     const api = useContext<KouponBankApi>(ApiContext);
//     const selectBusiness = (event) => {
//         props.selectBusiness(props.businessId);
//         // console.log(props.user.id)
//         // console.log(props.businessId)
//         // props.getBusiness(api, props.user.id, props.businessId);
//         event.preventDefault();
//     }
    
//     return ( 
export interface Prop {
    business: Business;
    selectBusiness: (business) => void;
    setBusinessPage: (business: Business) => void;
}

export const BusinessTable = (props: Prop): JSX.Element => {
    const history = useHistory();

    const goToBusinessPage = () => {
        // TODO: SET CORRECT BUSINESS LOCATION.
        props.setBusinessPage(props.business);
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
                        onClick={props.selectBusiness}
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

const mapDispatchToProps = (dispatch: Dispatch<BusinessAction>) => {
    return {
        setBusinessPage: (business: Business) =>
            dispatch({ type: BusinessActionType.SetBusinessSuccess, business: business }),
    };
};

export const BusinessTableR = connect(null, mapDispatchToProps)(BusinessTable);
