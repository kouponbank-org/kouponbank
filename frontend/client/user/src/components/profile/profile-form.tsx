import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import React from "react";
import { User, UserDetail } from "../../api/kb-types";
import "./profile-page.scss";

/**
 * Represents the required properties of the user profile page.
 */
export interface Prop {
    temp: UserDetail;
    editDetails: (event) => void;
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
      <div className='layout'>
        <Typography component="h1" variant="h5">
            내 프로필
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
                    variant ="outlined"
                    name="name"
                    fullWidth
                    id="name"
                    label="Name"
                    disabled
                    value={props.userDetailCredentials.name}
                />
                <TextField
                    variant ="outlined"
                    name="gender"
                    fullWidth
                    id="gender"
                    label="Gender"
                    disabled
                    value={props.userDetailCredentials.gender}
                />
                <TextField
                    variant ="outlined"
                    name="birthday"
                    fullWidth
                    id="birthday"
                    label="Birthday"
                    disabled
                    value={props.userDetailCredentials.birthday}
                />
            </Grid>
            <form className="form">
                <Button fullWidth
                    variant="contained"
                    color="primary"
                    className="editbutton"
                    onClick={modalStatus}>
                        Edit
                </Button>
            </form>
            </Grid>
            <Dialog
                open={open}
                onClose={modalStatus}
                aria-labelledby="form-dialog"
            >
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
