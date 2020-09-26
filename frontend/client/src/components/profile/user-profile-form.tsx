import React from "react";
import { Button, Grid, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { User, UserDetail } from "../../api/kb-types";
import './user-profile-page.scss';



/**
 * Represents the required properties of the user profile page.
 */
export interface Prop {
    editDetails: (event) => void;
    submitChange: (event) => void;
    updatedInfo: {
        name: string,
        gender: string,
        birthday: string,
        location: string | number,
        profile_picture: null,
    };
    userDetailCredentials: UserDetail; 
    userCredentials: User;
};


export const UserProfileForm = (props: Prop) =>  {
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const editDetails = (event): void => {
    props.editDetails(event);
};

const submitChange = (event): void => {
    props.submitChange(event);
    handleClose();
};

    return (
      <div className='layout'>
        <Typography component="h1" variant="h5">
            User Profile
        </Typography>
        <form className="form">
        {/* upload profile picture */}
        {/* <Paper className="paper" variant="outlined">
        <Grid item>
            <ButtonBase className="image">
              <img alt="complex" src= "/images/쿠폰뱅크.PNG"/>
            </ButtonBase>
          </Grid>
            <Grid item xs={12} sm container>
                <Grid>
                    <IconButton  
                        aria-label="edit"
                        onClick={handleClickOpen}
                        >
                        <EditIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Paper> */}
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    disabled
                    variant="outlined"
                    fullWidth
                    label="유저네임"
                    id="username"
                    value={props.userCredentials.username} 
                />
                <TextField
                    disabled
                    variant="outlined"
                    label="이메일"
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
                    label="이름"
                    disabled
                    value={props.userDetailCredentials.name}
                />
                <TextField
                    variant ="outlined"
                    name="gender"
                    fullWidth
                    id="gender"
                    label="성별"
                    disabled
                    value={props.userDetailCredentials.gender}
                />
                <TextField
                    variant ="outlined"
                    name="birthday"
                    fullWidth
                    id="birthday"
                    label="생일"
                    disabled
                    value={props.userDetailCredentials.birthday}
                />
            </Grid>
            <form className="form">
                <Button fullWidth
                    variant="contained"
                    color="primary"
                    className="editbutton"
                    onClick={handleClickOpen}>
                        수정하기
                </Button>
            </form>
            </Grid>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog"
            >
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
                        value={props.updatedInfo.name}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="gender"
                        id="gender-update"
                        label="Gender"
                        fullWidth
                        onChange={editDetails}
                        value={props.updatedInfo.gender}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="birthday"
                        id="birthday-update"
                        label="Birthday"
                        fullWidth
                        onChange={editDetails}
                        value={props.updatedInfo.birthday}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitChange} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
      </div>
    );
};
