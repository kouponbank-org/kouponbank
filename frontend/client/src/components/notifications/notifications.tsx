import { Collapse, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import { NotificationType } from "../../store/notification/notification-reducer";
import "./notifications.scss";

export interface Prop {
    onClose?: () => void;
    showNotifications: boolean;
    displayNotification: boolean;
    notificationType: NotificationType;
    notificationHeader: string | JSX.Element;
    notificationBody: string | JSX.Element;
}

export const Notifications = (props: Prop) => {
    if (props.displayNotification) {
        return <div className="notification">
            <Collapse in={props.showNotifications}>
                <Alert
                    severity={props.notificationType === NotificationType.Failure ? "error" : "success"}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={props.onClose}
                        >
                            <Close className="close-button"/>
                        </IconButton>
                    }
                >
                    <AlertTitle>
                        {props.notificationHeader}
                    </AlertTitle>
                    {props.notificationBody}
                </Alert>
            </Collapse>
        </div>
    } else {
        return null;
    }
}