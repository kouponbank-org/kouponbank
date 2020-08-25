import {
    AppBar,
    Button,
    InputBase,
    Toolbar,
    Typography
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { ReactElement } from "react";
import "./navigation-bar.scss";

export interface Prop {
    username: string;
    title: string;
    buttonName: string;
    onLoginClick: (event) => void;
}

export const NavBar = (props: Prop): ReactElement => {
    return (
        <div className="nav-bar">
            <AppBar>
                <Toolbar>
                    <Typography className="title" variant="h6">
                        {props.title}
                    </Typography>
                    <div className="search">
                        {
                            props.title === ("Homepage") ? (  
                                <Search 
                                /> &&
                                <InputBase
                                    className="search"
                                    classes={{
                                        root: "search-bar-root",
                                        input: "search-bar-input",
                                    }}
                                    placeholder="Search…"
                                    aria-label="search"
                                />
                            ) : (
                                ""
                            )
                        }
                    </div>
                    {
                        props.title === ("Homepage") ? (
                            props.username === ("") ? (
                                <Button className="button" onClick={props.onLoginClick}>
                                    {props.buttonName}
                                </Button> 
                            ) : (
                                props.username
                            )
                        ) : (
                            <Button className="button" onClick={props.onLoginClick}>
                                {props.buttonName}
                            </Button>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
};
