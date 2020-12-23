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

import { User, UserDetail } from "../../api/kb-types";

/**
 * Represents the required properties of the user profile page.
 */
export interface Prop {
    temp: UserDetail;
    editDetails: (event) => void;
    uploadImage: (event) => void;
    submitChange: (event) => void;
    userDetailCredentials: UserDetail;
    userCredentials: User;
}

export const UserProfileForm = (props: Prop): JSX.Element => {
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
                            value={props.userCredentials.username}
                        />
                        <TextField
                            disabled
                            variant="outlined"
                            label="Email"
                            fullWidth
                            id="email"
                            defaultValue={props.userCredentials.email}
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
                            value={props.userDetailCredentials.name}
                        />
                        <TextField
                            variant="outlined"
                            name="gender"
                            fullWidth
                            id="gender"
                            label="Gender"
                            disabled
                            value={props.userDetailCredentials.gender}
                        />
                        <TextField
                            variant="outlined"
                            name="birthday"
                            fullWidth
                            id="birthday"
                            label="Birthday"
                            disabled
                            value={props.userDetailCredentials.birthday}
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
                            Edit
                        </Button>
                    </form>
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}${props.userDetailCredentials.profile_picture}`}
                    />
                </Grid>
                <Dialog open={open} onClose={modalStatus} aria-labelledby="form-dialog">
                    <DialogTitle id="form-dialog">Edit Profile</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            id="name-update"
                            label="Name"
                            fullWidth
                            onChange={editDetails}
                            value={props.temp.name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="gender"
                            id="gender-update"
                            label="Gender"
                            fullWidth
                            onChange={editDetails}
                            value={props.temp.gender}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="birthday"
                            id="birthday-update"
                            label="Birthday"
                            fullWidth
                            onChange={editDetails}
                            value={props.temp.birthday}
                        />
                        <input type="file" name="profile_picture" onChange={props.uploadImage} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={modalStatus} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={submitChange} color="primary">
                            Submit Change
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
};
