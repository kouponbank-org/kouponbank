import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { Button, Grid, Paper, TableBody, Typography } from "@material-ui/core";

import { KouponBankApi } from "../../api/kb-api";
import { Business, Owner } from "../../api/kb-types";
import { getBusiness, getOwnerBusinesses } from "../../store/business/business-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext, UrlPaths } from "../base-page-router";
import { TopNavBarR } from "../navigation/navigation-bar";
import { BusinessRow } from "./business-row/business-row";

export interface Prop {
    owner: Owner;
    business: Business;
    businesses: Business[];
    businessClick: (event) => void;
    getOwnerBusinesses: (api: KouponBankApi, ownerId: string) => void;
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
}

export const BusinessListPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();

    useEffect(() => {
        props.getOwnerBusinesses(api, props.owner.id);
    }, []);

    const businessClick = (event): void => {
        history.push(UrlPaths.CreateBusinessPage)
    };

    const selectBusiness = (businessId: string) => {
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
        owner: state.ownerReducer.owner,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getBusiness: async (api: KouponBankApi, businessId: string ) => {
            return getBusiness(api, businessId, dispatch);
        },
        getOwnerBusinesses: async (api: KouponBankApi, ownerId: string) => {
            return getOwnerBusinesses(api, ownerId, dispatch);
        },
    }
}

export const BusinessListPageR = connect(mapStateToProps, mapDispatchToProps)(BusinessListPage);