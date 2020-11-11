import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Coupon } from "../../api/kb-types";
import "./create-coupon.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    coupon: Coupon;
    couponInformationInput: (event) => void;
    createCouponClick: (event) => void;
}

export const CreateCouponForm = (props: Prop): JSX.Element => {
    // 쿠폰 정보
    const couponInformationInput = (event): void => {
        props.couponInformationInput(event);
    };

    // 쿠폰 만들기
    const createCouponClick = (event): void => {
        props.createCouponClick(event);
    };

    return (
        <div className="layout">
            <form className="form" onSubmit={createCouponClick} autoComplete="off">
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="coupon_title"
                            id="coupon_title"
                            label="쿠폰 이름"
                            autoComplete="off"
                            type="text"
                            onChange={couponInformationInput}
                            value={props.coupon.coupon_title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="coupon_code"
                            id="coupon_code"
                            label="쿠폰 코드"
                            autoComplete="off"
                            type="text"
                            onChange={couponInformationInput}
                            value={props.coupon.coupon_code}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="description"
                            id="description"
                            label="쿠폰 정보"
                            autoComplete="off"
                            type="text"
                            onChange={couponInformationInput}
                            value={props.coupon.description}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="createbutton"
                >
                    Add Coupon
                </Button>
            </form>
        </div>
    );
};
