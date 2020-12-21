import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Business } from "../../api/kb-types";
import "./discover-page.scss";

// listing items for the drawer in the map.
// Needed to set them up separatly in order to pass individual business info.

export interface Prop {
    drawerVisibility: string;
}

export const DiscoverDrawer = (props: Prop): JSX.Element => {
    console.log(props.drawerVisibility)
    return (
        <div id="discover-drawer" className={props.drawerVisibility}>
            Hi
        </div>
    );
};
