import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Business, Coupon, User } from "../../api/kb-types";
import { RootReducer } from "../../store/reducer";
import { MapR } from "../naver-map/map";
import { BottomNavBar } from "../navigation/navigation-bottom-bar";
import { TopNavBarR } from "../navigation/navigation-top-bar";
import { DiscoverDrawer } from "./discover-drawer";
import "./discover-page.scss";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    user: User;
    coupon: Coupon;
    business: Business;
    businesses: Business[];
}

export const DiscoverPage: React.FC<Prop> = (props: Prop) => {
    const [mapBoundaries, setMapBoundaries] = useState({width: "100%", height: `${window.innerHeight * .844}px`})
    
    return (
        <div className="discover-page">
            <TopNavBarR title={"Discover"} />
            <div className="discover-page map">
                <MapR
                    mapBoundaries={mapBoundaries}
                />
            </div>
            <BottomNavBar />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        coupon: state.couponReducer.coupon,
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
    };
};

/*
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};
*/

export const DiscoverPageR = connect(mapStateToProps, null)(DiscoverPage);
