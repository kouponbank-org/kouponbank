import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootReducer } from "../../store/reducer";

interface Prop {

}

const BusinessPage: React.FC<Prop> = (props: Prop) => {
    return (
        <div className="business-page">
            Business Page TBD
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {

    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {

};

export const BusinessPageR = connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
