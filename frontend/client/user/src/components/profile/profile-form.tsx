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
    user: User;
    userDetail: UserDetail;
    editDetailInput: (event) => void;
    uploadImage: (event) => void;
    updateUserDetailClick: (event) => void;
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

    const editDetailInput = (event): void => {
        props.editDetailInput(event);
    };

    const updateUserDetailClick = (event): void => {
        props.updateUserDetailClick(event);
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
                            value={props.user.username}
                        />
                        <TextField
                            disabled
                            variant="outlined"
                            label="Email"
                            fullWidth
                            id="email"
                            defaultValue={props.user.email}
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
                            value={props.user.user_detail.name}
                        />
                        <TextField
                            variant="outlined"
                            name="gender"
                            fullWidth
                            id="gender"
                            label="Gender"
                            disabled
                            value={props.user.user_detail.gender}
                        />
                        <TextField
                            variant="outlined"
                            name="birthday"
                            fullWidth
                            id="birthday"
                            label="Birthday"
                            disabled
                            value={props.user.user_detail.birthday}
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
                        src={`${process.env.REACT_APP_API_BASE_URL}${props.user.user_detail.user_picture}`}
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
                            onChange={editDetailInput}
                            value={props.userDetail.name}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="gender"
                            id="gender-update"
                            label="Gender"
                            fullWidth
                            onChange={editDetailInput}
                            value={props.userDetail.gender}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="birthday"
                            id="birthday-update"
                            label="Birthday"
                            fullWidth
                            onChange={editDetailInput}
                            value={props.userDetail.birthday}
                        />
                        <input type="file" name="profile_picture" onChange={props.uploadImage} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={modalStatus} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={updateUserDetailClick} color="primary">
                            Submit Change
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
};
