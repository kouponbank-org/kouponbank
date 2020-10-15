import { Paper, ButtonBase, Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { MapR } from "../naver-map/map";
import { Coupon, Business, BusinessLocation } from "../../api/kb-types";
import './homepage.scss';


export interface Prop {
    coupon: Coupon;
    business: Business;
    businessLocation: BusinessLocation;
    couponClick: (event) => void;
    businessClick: (event) => void;
};

export const OwnerHomepageForm = (props: Prop) => {

    const couponClick = (event): void => {
        props.couponClick(event);
    };

    const businessClick = (event): void => {
        props.businessClick(event);
    };

    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                내 사업장
            </Typography>
            {
                props.business.id !== "" ? (
                    <Grid container>
                        <Paper className="paper" variant="outlined">
                            <Grid item>
                                <ButtonBase
                                    onClick={businessClick} 
                                    className="image">
                                <img alt="complex" src= {props.business.business_picture}/>
                                </ButtonBase>
                            </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid>
                                    <TextField
                                        fullWidth
                                        name="business_name"
                                        id="business_name"
                                        label="사업장 이름"
                                        disabled
                                        value={props.business.business_name}
                                    />
                                    <TextField
                                        fullWidth
                                        name="business_email"
                                        id="business_email"
                                        label="이메일"
                                        disabled
                                        value={props.business.business_email}
                                    />
                                    <TextField
                                        fullWidth
                                        name="roadAddress"
                                        id="roadAddress"
                                        label="도로명 주소"
                                        disabled
                                        value={props.businessLocation.roadAddress}
                                    />
                                    </Grid>
                                </Grid>
                            </Paper>
                    </Grid>
                ) : (
                    <Grid container>
                        <Paper className="paper" variant="outlined">
                            <Button
                                onClick={businessClick}
                            >
                                추가하기
                            </Button>
                        </Paper>
                    </Grid>
                )
            }
            
            <Typography component="h1" variant="h5">
                나의 오늘의 쿠폰
            </Typography>
            {
                props.coupon.id !== "" ? (
                    <Grid container>
                        <Paper className="paper" variant="outlined">
                            <Grid item>
                                <ButtonBase 
                                    onClick={couponClick}
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
                        </Paper>
                    </Grid>
                ) : (
                    <Grid container>
                        <Paper className="paper" variant="outlined">
                            <Button
                                onClick={couponClick}
                            >
                                추가하기
                            </Button>
                        </Paper>
                    </Grid>
                )
            }
            <MapR />
        </div>
    );
};