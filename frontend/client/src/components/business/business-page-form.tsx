import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { Coupon, Business } from "../../api/kb-types";
import './business-page.scss';

/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    isUser: Boolean;
    businessInput?: Business;
    business: Business;
    coupon: Coupon;
    editDetails?: (event) => void;
    submitChange?: (event) => void;
}

export const BusinesspageForm = (props: Prop) => { 
    const [open, setOpen] = React.useState(false);
    
    const modalStatus = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const editDetails = (event): void => {
        props.editDetails(event);
    };

    const submitChange = (event): void => {
        props.submitChange(event);
        modalStatus();
    };

    return (
      <div className='layout'>
        <Typography component="h1" variant="h5">
            {props.business.business_name}
        </Typography>
        <Grid container>
            <div>
            <Grid item xs={12}>
                {props.business.business_name}
                {props.business.business_email}
                {props.business.business_picture}
                {props.business.description}
            </Grid>
            </div>
            
            {
                props.isUser===false ? (
                    <div>
                    <Grid item xs={12}>
                        <form className="form">
                            <Button fullWidth
                                variant="contained"
                                color="primary"
                                className="editbutton"
                                onClick={modalStatus}>
                                    수정
                            </Button>
                        </form>
                        </Grid>
                        <Dialog 
                            open={open} 
                            onClose={modalStatus} 
                            aria-labelledby="form-dialog"
                        >
                            <DialogTitle id="form-dialog">사업장 정보 수정</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="business_name"
                                    id="business_name-update"
                                    label="사업장명"
                                    fullWidth
                                    onChange={editDetails}
                                    value={props.businessInput.business_name}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="business_email"
                                    id="business_email-update"
                                    label="사업장 이메일"
                                    fullWidth
                                    onChange={editDetails}
                                    value={props.businessInput.business_email}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="description"
                                    id="description-update"
                                    label="사업장 소개"
                                    fullWidth
                                    onChange={editDetails}
                                    value={props.businessInput.description}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={modalStatus} color="primary">
                                    취소
                                </Button>
                                <Button onClick={submitChange} color="primary">
                                    수정
                                </Button>
                            </DialogActions>
                        </Dialog>
                        </div>
                ) : (
                    ""
                )
            }
            </Grid>

            {/* Need to redirect to create coupon page or add it on spot like a dialog? */}
            
            {
                props.coupon.coupon_title === "" && props.isUser===false ? (
                    <div>
                        <Button fullWidth
                            variant="contained"
                            color="primary"
                            className="editbutton">
                                쿠폰 추가하기
                        </Button>
                    </div>
                ):(
                    <Grid>
                        <Typography component="h1" variant="h5">
                            쿠폰
                        </Typography>
                        {props.coupon.coupon_title}
                        {props.coupon.coupon_code}
                    </Grid>
                )
            }
      </div>
    );
};
