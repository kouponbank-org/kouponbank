import { Button, ButtonBase, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Business, BusinessLocation, Coupon } from "../../api/kb-types";
import { MapR } from "../naver-map/map";
import './homepage.scss';
import { BusinessTable } from "../business/business-table";

export interface Prop {
    coupon: Coupon;
    businesses: Business[];
    business: Business;
    businessLocation: BusinessLocation;
    couponClick: (event) => void;
    businessClick: (event) => void;
    selectBusiness: (business) => void;
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
            <div>
                { 
                    props.businesses.map((business, index) => {
                        return (
                            <BusinessTable 
                                key={index}
                                business_name={business.business_name}
                                business_email={business.business_email}
                                description={business.description}
                                business_picture={business.business_picture}
                                selectBusiness={props.selectBusiness}
                            />
                        )
                    })
                }
            </div>
            <Grid container>
                <Paper className="paper" variant="outlined">
                    <Button
                        onClick={businessClick}
                    >
                        추가하기
                    </Button>
                </Paper>
            </Grid>
                
            
            <Typography component="h1" variant="h5">
                나의 오늘의 쿠폰
            </Typography>
            {
                props.coupon.coupon_title !== "" ? (
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