import "./notifications.scss";

import React from "react";

import { Collapse, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";

import { AlertType } from "../../api/kb-types";

export interface Prop {
    onClose?: () => void;
    showAlert: boolean;
    displayAlert: boolean;
    alertType: AlertType;
    alertHeader: string | JSX.Element;
    alertBody: string | JSX.Element;
}

export const Notifications: React.FC<Prop> = (props: Prop) => {
    if (props.displayAlert) {
        return (
            <div>
                <Collapse in={props.showAlert}>
                    <Alert
                        severity={props.alertType === AlertType.FAILURE ? "error" : "success"}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={props.onClose}
                            >
                                <Close className="alert-button" />
                            </IconButton>
                        }
                    >
                        <AlertTitle> {props.alertHeader} </AlertTitle>
                        {props.alertBody}
                    </Alert>
                </Collapse>
            </div>
        );
    } else {
        return null;
    }
};
