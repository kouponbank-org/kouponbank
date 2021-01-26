import "./profile-page.scss";

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

import { Owner, OwnerDetail } from "../../api/kb-types";

/**
 * Represents the required properties of the owner profile page.
 */
export interface Prop {
    owner: Owner;
    ownerDetail: OwnerDetail;
    editDetails: (event) => void;
    submitChange: (event) => void;
}

export const ProfileForm = (props: Prop): JSX.Element => {
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
                My Profile
            </Typography>
            <form className="form">
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            variant="outlined"
                            fullWidth
                            label="Username"
                            id="username"
                            value={props.owner.username}
                        />
                        <TextField
                            disabled
                            variant="outlined"
                            label="Email"
                            fullWidth
                            id="email"
                            defaultValue={props.owner.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            name="name"
                            fullWidth
                            id="name"
                            label="Name"
                            disabled
                            value={props.owner.owner_detail.name}
                        />
                        <TextField
                            variant="outlined"
                            name="gender"
                            fullWidth
                            id="gender"
                            label="Gender"
                            disabled
                            value={props.owner.owner_detail.gender}
                        />
                        <TextField
                            variant="outlined"
                            name="birthday"
                            fullWidth
                            id="birthday"
                            label="Birthday"
                            disabled
                            value={props.owner.owner_detail.birthday}
                        />
                    </Grid>
                    <form className="form">
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="editbutton"
                            onClick={modalStatus}
                        >
                            수정
                        </Button>
                    </form>
                </Grid>
                <Dialog open={open} onClose={modalStatus} aria-labelledby="form-dialog">
                    <DialogTitle id="form-dialog">프로필 수정</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            id="name-update"
                            label="Name"
                            fullWidth
                            onChange={editDetails}
                            value={props.ownerDetail.name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="gender"
                            id="gender-update"
                            label="Gender"
                            fullWidth
                            onChange={editDetails}
                            value={props.ownerDetail.gender}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="birthday"
                            id="birthday-update"
                            label="Birthday"
                            fullWidth
                            onChange={editDetails}
                            value={props.ownerDetail.birthday}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={modalStatus} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={submitChange} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
};
