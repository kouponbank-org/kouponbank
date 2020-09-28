import { Button, Grid, TextField } from "@material-ui/core";
import React from "react";
import { Business, BusinessLocation } from "../../api/kb-types";
import './create-business.scss';

/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    business: Business;
    businessLocation: BusinessLocation;
    businessInformationInput: (event) => void;
    businessLocationInput: (event) => void;
    createBusinessClick: (event) => void;
}

export const CreateBusinessForm = (props: Prop) => { 

    // 사업장 정보 (이름, 이메일)
    const businessInformationInput = (event): void => { 
        props.businessInformationInput(event);
    }

    // 사업장 주소 (도로명, 지번, 우편번호)
    const businessLocationInput = (event): void => {
        props.businessLocationInput(event)
    }

    // 사업장 가입하기 클립
    const createBusinessClick = (event): void => { 
        props.createBusinessClick(event);
        event.preventDefault();
    }
 
    return ( 
        <div className="layout">
            <form className="form" onSubmit={createBusinessClick} autoComplete="off">
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="business_name"
                            id="business_name"
                            label="사업장 이름"
                            autoComplete="off"
                            type="text"
                            onChange={businessInformationInput}
                            value={props.business.business_name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="business_email"
                            id="business_email"
                            label="이메일"
                            autoComplete="off"
                            type="text"
                            onChange={businessInformationInput}
                            value={props.business.business_email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="description"
                            id="description"
                            label="사업장 소개"
                            autoComplete="off"
                            type="text"
                            onChange={businessInformationInput}
                            value={props.business.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="doromyeong"
                            id="doromyeong"
                            label="도로명 주소"
                            autoComplete="off"
                            type="text"
                            onChange={businessLocationInput}
                            value={props.businessLocation.doromyeong}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="jibeon"
                            id="jibeon"
                            label="지번 주소"
                            autoComplete="off"
                            type="text"
                            onChange={businessLocationInput}
                            value={props.businessLocation.jibeon}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="postal_code"
                            id="postal_code"
                            label="우편번호"
                            autoComplete="off"
                            type="text"
                            onChange={businessLocationInput}
                            value={props.businessLocation.postal_code}
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
                    사업장 가입
                </Button>
            </form>
        </div>
    )
}
