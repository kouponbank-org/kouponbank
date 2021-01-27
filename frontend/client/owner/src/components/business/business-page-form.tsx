import "./business-page.scss";

import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";

import { Business } from "../../api/kb-types";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    businessInput?: Business;
    business: Business;
    editDetails?: (event) => void;
    submitChange?: (event) => void;
    uploadImage: (event) => void;
}

export const BusinesspageForm = (props: Prop): JSX.Element => {
    const [open, setOpen] = React.useState(false);

    const modalStatus = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    };

    const editDetails = (event): void => {
        props.editDetails(event);
    };

    const submitChange = (event): void => {
        props.submitChange(event);
        modalStatus();
    };
    
    return (
        <div className="layout">
            <Typography component="h1" variant="h5">
                {props.business.business_name}
            </Typography>
            <Grid container>
                <div>
                    <Grid item xs={12}>
                        {props.business.business_name}
                        {props.business.business_detail.business_email}
                        {props.business.business_description}
                    </Grid>
                </div>
                <Grid item xs={12}>
                    <form className="form">
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="editbutton"
                            onClick={modalStatus}
                        >
                            Update
                        </Button>
                    </form>
                </Grid>
                <Dialog open={open} onClose={modalStatus} aria-labelledby="form-dialog">
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
                            value={props.businessInput.business_detail.business_email}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            id="description-update"
                            label="Business Description"
                            fullWidth
                            onChange={editDetails}
                            value={props.businessInput.business_description}
                        />
                        <input type="file" name="business_picture" onChange={props.uploadImage} />
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
            <img
                src={`${process.env.REACT_APP_API_BASE_URL}${props.business.business_detail.business_picture}`}
            />
        </div>
    );
};
