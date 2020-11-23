import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { RootReducer } from "../../store/reducer";
import { NavBarR } from "../navigation/navigation-bar";
import "./information.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {}

export const InfoPage: React.FC<Prop> = () => {
    //const api = useContext<KouponBankApi>(ApiContext);

    return (
        <div className="info-page">
            <NavBarR />
            <Drawer
                className="info-page drawer"
                variant="permanent"
                anchor="left"
            >
                <List>
                    {['사업장 등록', 'FAQ', '쿠폰뱅크 사용법'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {};
};
/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}*/

export const InfoPageR = connect(mapStateToProps)(InfoPage);
