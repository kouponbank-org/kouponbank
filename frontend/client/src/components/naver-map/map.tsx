import React, { useContext, useState } from "react";
import { NaverMap } from "react-naver-maps";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { BusinessLocation, NaverMapBound } from "../../api/kb-types";
import { getAllBusinessWithinNaverMapBounds, naverMapBoundChanged } from "../../store/naver-map/naver-map-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext } from "../base-page-router";
import { MapMarker } from "./map-marker";

export interface Prop {
    naverMapBoundChanged: (
        naverMapBound: NaverMapBound
    ) => void;
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound
    ) => Promise<void>;
    naverMapBound: NaverMapBound;
    businessLocations: BusinessLocation[];
};

export const Map = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const [naverMapBound, setNaverMapBound] = useState(props.naverMapBound);

    const calculateMapSpan = (bounds) => {
        const mapSpan: NaverMapBound = {
            maxLat: bounds.getNE().lat(),
            minLat: bounds.getSW().lat(),
            maxLng: bounds.getNE().lng(),
            minLng: bounds.getSW().lng(),
        }
        setNaverMapBound(mapSpan)
    }

    console.log(naverMapBound)
    const handleChangeBounds = (bounds) => {
        console.log(bounds)
        calculateMapSpan(bounds)
        props.naverMapBoundChanged(naverMapBound);
        /*여기에다 GET REQUEST FOR MAP MARKER AND BUSINESS LOCATION*/
        props.getAllBusinessWithinNaverMapBounds(api, naverMapBound);
    }; 


    return (
        <div>
            <NaverMap
                className="naver-map"
                id="react-naver-map"
                style={{
                    width: 500,
                    height: 500
                }}
                defaultCenter={{ lat: 37.3093, lng: 127.0858 }}
                defaultZoom={14}
                onBoundsChanged={handleChangeBounds}
            >
                <MapMarker 
                    businessLocations={props.businessLocations}
                />
            </NaverMap>
        </div>
    )
}

const mapStateToProps = (state: RootReducer) => {
    return {
        naverMapBound: state.naverMapReducer.naverMapBound,
        businessLocations: state.naverMapReducer.businessLocations
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        naverMapBoundChanged: (
            naverMapBound: NaverMapBound
        ) => {
            return naverMapBoundChanged(naverMapBound, dispatch);
        },
        getAllBusinessWithinNaverMapBounds: (
            api: KouponBankApi,
            naverMapBound: NaverMapBound
        ) => {
            return getAllBusinessWithinNaverMapBounds(api, naverMapBound, dispatch);
        }
    };
};

export const MapR = connect(mapStateToProps, mapDispatchToProps)(Map);