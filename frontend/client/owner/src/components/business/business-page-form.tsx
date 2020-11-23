import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Business, Coupon } from "../../api/kb-types";
import './business-page.scss';

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
            <Grid item xs={12}>
                <form className="form">
                    <Button fullWidth
                        variant="contained"
                        color="primary"
                        className="editbutton"
                        onClick={modalStatus}>
                            Update
                    </Button>
                </form>
                </Grid>
                <Dialog 
                    open={open} 
                    onClose={modalStatus} 
                    aria-labelledby="form-dialog"
                >
                    <DialogTitle id="form-dialog">Edit Business Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="business_name"
                            id="business_name-update"
                            label="Business Name"
                            fullWidth
                            onChange={editDetails}
                            value={props.businessInput.business_name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="business_email"
                            id="business_email-update"
                            label="Business Email"
                            fullWidth
                            onChange={editDetails}
                            value={props.businessInput.business_email}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            id="description-update"
                            label="Business Description"
                            fullWidth
                            onChange={editDetails}
                            value={props.businessInput.description}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={modalStatus} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={submitChange} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

            {/* Need to redirect to create coupon page or add it on spot like a dialog? */}
            
            {
                props.coupon.coupon_title === "" ? (
                    <div>
                        <Button fullWidth
                            variant="contained"
                            color="primary"
                            className="editbutton">
                                Add Coupon
                        </Button>
                    </div>
                ):(
                    <Grid>
                        <Typography component="h1" variant="h5">
                            Coupon
                        </Typography>
                        {props.coupon.coupon_title}
                        {props.coupon.coupon_code}
                    </Grid>
                )
            }
      </div>
    );
};
