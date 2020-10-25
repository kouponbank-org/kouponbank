import { Button, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import "./homepage.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    userId: string;
    selectedUser: (userId) => void;
}

export const UserTable = (props: Prop) => { 
    const selectedUser = (event) => {
        const user = {
            userId: props.userId,
        }
        props.selectedUser(user)
        event.preventDefault()
    }
    return ( 
        <div className="search-address">
            <TableRow className="search-address table">
                <TableCell>{props.userId}</TableCell>
                <TableCell>
                    <Button 
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="search-address button"
                        onClick={selectedUser}
                    >
                        user 선택
                    </Button>
                </TableCell>
            </TableRow>
        </div>
    )
}