import { useContext } from "react";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";
import { KouponBankApi } from "../../api/kb-api"
import { Business, Owner } from "../../api/kb-types";
import { ApiContext, UrlPaths } from "../base-page-router"
import { BusinessRow } from "./business-row/business-row"
import { getBusiness } from "../../store/business/business-reducer";
import { RootReducer } from "../../store/reducer";
import { connect } from "react-redux";
import React from "react";
import { TopNavBarR } from "../navigation/navigation-bar";
import { Button, ButtonBase, Grid, Paper, TableBody, TextField, Typography } from "@material-ui/core";

export interface Prop {
    business: Business;
    businesses: Business[];
    businessClick: (event) => void;
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
}

export const BusinessListPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();

    const businessClick = (event): void => {
        history.push(UrlPaths.CreateBusinessPage)
    };

    const selectBusiness = (businessId) => {
        props
            .getBusiness(api, businessId)
            .then((business) => {
                history.push(`/business/${business.id}`);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    return (
        <div className="businesses-list-page layout">
            <TopNavBarR />
            <Typography component="h1" variant="h5">
                My Businesses
            </Typography>
            <TableBody>
                {props.businesses.map((business) => {
                    return (
                        <BusinessRow
                            key={business.id}
                            business={business}
                            selectBusiness={selectBusiness}
                        />
                    );
                })}
            </TableBody>
            <Grid container>
                <Paper className="paper" variant="outlined">
                    <Button onClick={businessClick}>Add Business</Button>
                </Paper>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state: RootReducer) => {
    return {
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getBusiness: async (api: KouponBankApi, businessId: string ) => {
            return getBusiness(api, businessId, dispatch);
        }
    }
}

export const BusinessListPageR = connect(mapStateToProps, mapDispatchToProps)(BusinessListPage);