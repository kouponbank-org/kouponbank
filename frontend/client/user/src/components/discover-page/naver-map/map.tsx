import "./map.scss";

import React, { useContext, useEffect, useState } from "react";
import { NaverMap } from "react-naver-maps";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../../api/kb-api";
import { KoreaCoordinateBoundary, NaverMapDefaultCenter } from "../../../api/kb-const";
import {
    Business,
    Coordinate,
    GeolocationPosition,
    NaverMapBound,
    User,
} from "../../../api/kb-types";
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
    const history = useHistory();
    const [naverMapBound, setNaverMapBound] = useState<NaverMapBound>(props.naverMapBound);
    const [naverMapCenter, setNaverMapCenter] = useState<Coordinate>(NaverMapDefaultCenter);

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

    // FOR: NaverMapMarker
    // If the user clicks on the business image, it will direct them to the business page
    const directToBusinessPage = (businessId: string) => {
        props
            .getBusiness(api, businessId)
            .then((business) => {
                history.push(`/business/${business.id}`);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    // FOR: Naver Map
    // When geolocation is given,
    // If the user's location is within korea, set the Naver Map Center to
    // the user's position.
    const centerMapPositionToUser = (lat: number, lng: number) => {
        if (
            KoreaCoordinateBoundary.lat_one > lat &&
            KoreaCoordinateBoundary.lat_two < lat &&
            KoreaCoordinateBoundary.lng_one > lng &&
            KoreaCoordinateBoundary.lng_two < lng
        ) {
            setNaverMapCenter({ lat: lat, lng: lng });
        }
    };

    const geolocationSuccess = (position: GeolocationPosition) => {
        const coordinates = position.coords;
        centerMapPositionToUser(coordinates.latitude, coordinates.longitude);
    };

    const geolocationFail = () => {
        // TODO: Figure out what to do if geolocation fails.
    };

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    };

    // FOR: Naver Map Center
    // Acquires current geolocation of the user.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFail, options);
    }, []);

    return (
        <div id="naver-map-container">
            <NaverMap
                id="naver-map-map"
                style={{
                    width: props.mapBoundaries.width,
                    height: props.mapBoundaries.height,
                }}
                defaultCenter={naverMapCenter}
                defaultZoom={17}
                minZoom={15}
                maxZoom={19}
                onBoundsChanged={handleChangeBounds}
            >
                <MapMarker
                    naverMapBusinesses={props.naverMapBusinesses}
                    directToBusinessPage={directToBusinessPage}
                />
            </NaverMap>
            <button id="naver-map-discover-button" type="submit" onClick={handleGetBusinessesClick}>
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
