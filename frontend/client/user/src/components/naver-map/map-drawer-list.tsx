import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Business } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import "./map.scss";

// listing items for the drawer in the map. 
// Needed to set them up separatly in order to pass individual business info.

export interface Prop {
    business: Business;
    selectBusiness: (businessId) => void;
}

export const MapDrawerList= (props: Prop): JSX.Element => {
    const selectBusiness = () => {
        props.selectBusiness(props.business.id);
    };

    return (
        <div className="naver-map">
            <ListItem 
                alignItems='flex-start'
                button={true}
                onClick={selectBusiness}
                key={props.business.id}>
                <ListItemText 
                    primary={props.business.business_name}
                    secondary={props.business.description} />
            </ListItem>    
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        
    };
};

export const MapDrawerListR = connect(null, mapDispatchToProps)(MapDrawerList);