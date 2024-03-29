import "./information.scss";

import React from "react";

import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import { NavBar } from "../common-components/navigation/navigation-bar";

/**
 * Represents the required properties of the HomePage.
 */

export const InfoPage = (): JSX.Element => {
    return (
        <div className="info-page">
            <NavBar />
            <Drawer className="info-page drawer" variant="permanent" anchor="left">
                <List>
                    {["사업장 등록", "FAQ", "쿠폰뱅크 사용법"].map((text) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
};
