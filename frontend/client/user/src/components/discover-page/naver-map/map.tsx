import "./map.scss";

import React, { useContext, useState } from "react";
import { NaverMap } from "react-naver-maps";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../../api/kb-api";
import { Business, NaverMapBound, User } from "../../../api/kb-types";
import { getBusiness } from "../../../store/business/business-reducer";
import {
    getAllBusinessWithinNaverMapBounds,
    naverMapBoundChanged,
} from "../../../store/naver-map/naver-map-reducer";
import { RootReducer } from "../../../store/reducer";
import { ApiContext } from "../../base-page-router";
import { MapMarker } from "./map-marker";

export interface Prop {
    user?: User;
    naverMapBound: NaverMapBound;
    naverMapBusinesses: Business[];
    mapBoundaries: { width: string; height: string };
    discoverNearMeClick?: (businesses: Business[]) => void;
    naverMapBoundChanged: (naverMapBound: NaverMapBound) => void;
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound,
    ) => Promise<Business[]>;
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
}

export const Map: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const [naverMapBound, setNaverMapBound] = useState(props.naverMapBound);

    // FOR: handleChangeBounds method
    // Calculates the map boundary at each map movement
    const calculateMapSpan = (bounds) => {
        const mapSpan: NaverMapBound = {
            maxLat: bounds.getNE().lat(),
            minLat: bounds.getSW().lat(),
            maxLng: bounds.getNE().lng(),
            minLng: bounds.getSW().lng(),
        };
        setNaverMapBound(mapSpan);
    };

    // FOR: NaverMap
    // Updates the map boundary at each map movement
    const handleChangeBounds = (bounds) => {
        calculateMapSpan(bounds);
        props.naverMapBoundChanged(naverMapBound);
    };

    // FOR: Discover Near Me button.
    // When the button is clicked, it gets the business list in the map bound
    const handleGetBusinessesClick = () => {
        props
            .getAllBusinessWithinNaverMapBounds(api, naverMapBound)
            .then((businesses) => {
                props.discoverNearMeClick(businesses);
            })
            .catch(() => {
                //
            });
    };

    //현재 위치 정보 받기
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    // });

    return (
        <div id="naver-map-container">
            <NaverMap
                id="naver-map-map"
                style={{
                    width: props.mapBoundaries.width,
                    height: props.mapBoundaries.height,
                }}
                defaultCenter={{ lat: 37.3093, lng: 127.0858 }}
                defaultZoom={17}
                minZoom={15}
                maxZoom={19}
                onBoundsChanged={handleChangeBounds}
            >
                <MapMarker naverMapBusinesses={props.naverMapBusinesses} />
            </NaverMap>
            <button
                id="naver-map-discover-button"
                type="submit"
                onClick={handleGetBusinessesClick}
            >
                Discover Near Me
            </button>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        naverMapBound: state.naverMapReducer.naverMapBound,
        naverMapBusinesses: state.naverMapReducer.naverMapBusinesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        naverMapBoundChanged: (naverMapBound: NaverMapBound) => {
            return naverMapBoundChanged(naverMapBound, dispatch);
        },
        getAllBusinessWithinNaverMapBounds: async (
            api: KouponBankApi,
            naverMapBound: NaverMapBound,
        ) => {
            return getAllBusinessWithinNaverMapBounds(api, naverMapBound, dispatch);
        },
        getBusiness: async (api: KouponBankApi, businessId: string) => {
            return getBusiness(api, businessId, dispatch);
        },
    };
};

export const MapR = connect(mapStateToProps, mapDispatchToProps)(Map);
