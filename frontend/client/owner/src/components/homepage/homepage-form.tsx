import { Button, ButtonBase, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Business, Coupon } from "../../api/kb-types";
import { MapR } from "../naver-map/map";
import { BusinessTable } from "./business-table/business-table";
import "./homepage.scss";

export interface Prop {
    coupon: Coupon;
    businesses: Business[];
    business: Business;
    couponClick: (event) => void;
    businessClick: (event) => void;
    selectBusiness: (businessId) => void;
}

export const HomepageForm = (props: Prop): JSX.Element => {
    const couponClick = (event): void => {
        props.couponClick(event);
    };

    const businessClick = (event): void => {
        props.businessClick(event);
    };

    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                My Business
            </Typography>
            <div>
                {props.businesses.map((business) => {
                    return (
                        <BusinessTable
                            key={business.id}
                            business={business}
                            selectBusiness={props.selectBusiness}
                        />
                    );
                })}
            </div>
            <Grid container>
                <Paper className="paper" variant="outlined">
                    <Button onClick={businessClick}>Add Business</Button>
                </Paper>
            </Grid>
            <Typography component="h1" variant="h5">
                My Coupon
            </Typography>
            {props.coupon.coupon_title !== "" ? (
                <Grid container>
                    <Paper className="paper" variant="outlined">
                        <Grid item>
                            <ButtonBase onClick={couponClick} className="image">
                                <img alt="complex" src={props.coupon.coupon_picture} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid>
                                <TextField
                                    fullWidth
                                    name="coupon_title"
                                    id="coupon_title"
                                    label="Coupon Name"
                                    disabled
                                    value={props.coupon.coupon_title}
                                />
                                <TextField
                                    fullWidth
                                    name="coupon_code"
                                    id="coupon_code"
                                    label="Coupon Code"
                                    disabled
                                    value={props.coupon.coupon_code}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ) : (
                <Grid container>
                    <Paper className="paper" variant="outlined">
                        <Button onClick={couponClick}>Add Coupon</Button>
                    </Paper>
                </Grid>
            )}
            <MapR />
        </div>
    );
};
