import { Button, Drawer, List } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { NaverMap } from "react-naver-maps";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../api/kb-api";
import { Business, NaverMapBound, User } from "../../api/kb-types";
import { getBusiness } from "../../store/business/business-reducer";
import {
    getAllBusinessWithinNaverMapBounds,
    naverMapBoundChanged
} from "../../store/naver-map/naver-map-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext } from "../base-page-router";
import { MapDrawerList } from "./map-drawer-list";
import { MapMarker } from "./map-marker";
import "./map.scss";

export interface Prop {
    user?: User;
    naverMapBoundChanged: (naverMapBound: NaverMapBound) => void;
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound,
    ) => Promise<Business[]>;
    naverMapBound: NaverMapBound;
    naverMapBusinesses: Business[];
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
}

export const Map: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [naverMapBound, setNaverMapBound] = useState(props.naverMapBound);
    const [Businesses, setBusinesses] = useState<Business[]>([]);
    const calculateMapSpan = (bounds) => {
        const mapSpan: NaverMapBound = {
            maxLat: bounds.getNE().lat(),
            minLat: bounds.getSW().lat(),
            maxLng: bounds.getNE().lng(),
            minLng: bounds.getSW().lng(),
        };
        setNaverMapBound(mapSpan);
    };

    const handleChangeBounds = (bounds) => {
        calculateMapSpan(bounds);
        props.naverMapBoundChanged(naverMapBound);
    };

    //when the button is clicked, it gets the business list in the map bound
    const handleGetBusinessesClick = () => {
        props
            .getAllBusinessWithinNaverMapBounds(api, naverMapBound)
            .then((businesses) => {
                setBusinesses(businesses);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    //현재 위치 정보 받기
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log("Latitude is :", position.coords.latitude);
    //     console.log("Longitude is :", position.coords.longitude);
    // });

    const selectBusiness = (businessId) => {
        props
            .getBusiness(api, businessId)
            .then((business) => {
                history.push(`/business/${business.id}`);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    return (
        <div className="naver-map">
            <Drawer className="drawer" variant="permanent" anchor="left">
                <List>
                    {Businesses.map((business) => {
                        return (
                            <MapDrawerList
                                key={business.id}
                                business={business}
                                selectBusiness={selectBusiness}
                            />
                        );
                    })}
                </List>
            </Drawer>
            <NaverMap
                style={{
                    width: 500,
                    height: 500,
                }}
                defaultCenter={{ lat: 37.3093, lng: 127.0858 }}
                defaultZoom={17}
                onBoundsChanged={handleChangeBounds}
            >
                <MapMarker naverMapBusinesses={props.naverMapBusinesses} />
            </NaverMap>
            <Button type="submit" onClick={handleGetBusinessesClick}>
                Find Businesses
            </Button>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        businesses: state.businessReducer.businesses,
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
