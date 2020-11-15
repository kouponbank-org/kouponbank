import { Button, ButtonBase, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Business, Coupon } from "../../api/kb-types";
import { MapR } from "../naver-map/map";
import { BusinessTableR } from "./business-table/business-table";
import "./homepage.scss";

export interface Prop {
    coupon: Coupon;
    businesses: Business[];
    selectBusiness: (business) => void;
    couponClick: (event) => void;
}

export const HomepageForm = (props: Prop): JSX.Element => {
    return (
        <div className="layout">
            <div>
                {props.businesses.map((business) => {
                    return (
                        <BusinessTableR
                            key={business.id}
                            business={business}
                            selectBusiness={props.selectBusiness}
                        />
                    );
                })}
            </div>
            <Typography component="h1" variant="h5">
                Coupon Near Me
            </Typography>
            <Grid container>
                <Paper className="paper" variant="outlined">
                    <Grid item>
                        <ButtonBase className="image">
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
                    <Button className="button">View More</Button>
                </Paper>
            </Grid>

            <MapR />
        </div>
    );
};
