import { Paper, ButtonBase, Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Coupon } from "../../api/kb-types";
import { MapR } from "../naver-map/map";
import './homepage.scss';


export interface Prop {
    coupon: Coupon;
    couponClick: (event) => void;
};

export const HomepageForm = (props: Prop) => {

    const couponClick = (event): void => {
        props.couponClick(event);
    };

    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                내 주변 쿠폰
            </Typography>
                <Grid container>
                    <Paper className="paper" variant="outlined">
                        <Grid item>
                            <ButtonBase
                                className="image">
                            <img alt="complex" src= {props.coupon.coupon_picture}/>
                            </ButtonBase>
                        </Grid>
                            <Grid item xs={12} sm container>
                                <Grid>
                                <TextField
                                    fullWidth
                                    name="coupon_title"
                                    id="coupon_title"
                                    label="쿠폰 이름"
                                    disabled
                                    value={props.coupon.coupon_title}
                                />
                                <TextField
                                    fullWidth
                                    name="coupon_code"
                                    id="coupon_code"
                                    label="쿠폰 코드"
                                    disabled
                                    value={props.coupon.coupon_code}
                                />
                                </Grid>
                            </Grid>
                            <Button
                                className="button">
                                자세히 보기
                            </Button>
                        </Paper>
                </Grid>
            <MapR />
        </div>
    );
};