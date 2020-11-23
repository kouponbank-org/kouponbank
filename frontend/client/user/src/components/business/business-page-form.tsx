import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Business, Coupon } from "../../api/kb-types";
import "./business-page.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    businessInput?: Business;
    business: Business;
    coupon: Coupon;
    editDetails?: (event) => void;
    submitChange?: (event) => void;
}

export const BusinesspageForm = (props: Prop): JSX.Element => {
    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                {props.business.business_name}
            </Typography>
            <Grid container>
                <Grid item xs={12}>
                    {props.business.business_name}
                    {props.business.business_email}
                    {props.business.business_picture}
                    {props.business.description}
                </Grid>
            </Grid>
            <Grid>
                <Typography component="h1" variant="h5">
                    Coupon
                </Typography>
                {props.coupon.coupon_title}
                {props.coupon.coupon_code}
            </Grid>
        </div>
    );
};
