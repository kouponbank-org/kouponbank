import "./map.scss";

import React from "react";

import { ListItem, ListItemText } from "@material-ui/core";

import { Business } from "../../../api/kb-types";

// listing items for the drawer in the map.
// Needed to set them up separatly in order to pass individual business info.

export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const MapDrawerList = (props: Prop): JSX.Element => {
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };

    return (
        <div className="naver-map">
            <ListItem
                alignItems="flex-start"
                button={true}
                onClick={selectBusiness}
                key={props.business.id}
            >
                <ListItemText
                    primary={props.business.business_name}
                    secondary={props.business.description}
                />
            </ListItem>
        </div>
    );
};
