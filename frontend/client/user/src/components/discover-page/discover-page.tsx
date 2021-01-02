import "./discover-page.scss";

import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../api/kb-api";
import { Business, NaverMapBound } from "../../api/kb-types";
import { getBusiness } from "../../store/business/business-reducer";
import { getAllBusinessWithinNaverMapBounds } from "../../store/naver-map/naver-map-reducer";
import { RootReducer } from "../../store/reducer";
import { ApiContext } from "../base-page-router";
import { KouponBankSideTabBarR } from "../common-components/navigation/navigation-side-tab-bar";
import { TopNavBar } from "../common-components/navigation/navigation-top-bar";
import { Pagination } from "../common-components/pagination/pagination";
import { DiscoverBusinessList } from "./discover-list-business";
import { MapR } from "./naver-map/map";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    business: Business;
    businesses: Business[];
    naverMapBound: NaverMapBound;
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound,
    ) => Promise<Business[]>;
    getBusiness: (api: KouponBankApi, business_id: string) => Promise<Business>;
}

export const DiscoverPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPageBusinesses, setCurrentPageBusinesses] = useState<Business[]>([]);
    const [mapBoundaries, setMapBoundaries] = useState({
        width: "841px",
        height: `${window.innerHeight * 0.948}px`,
    });
    const businessesPerPage = 10;

    useEffect(() => {
        const lastIndex = currentPage * businessesPerPage;
        const firstIndex = lastIndex - businessesPerPage;
        setCurrentPageBusinesses(businesses.slice(firstIndex, lastIndex));
    }, [currentPage, pageNumbers]);

    // FOR: Discover Near Me button.
    // When you go into the DiscoverListPage from the map
    // it will use the map bounds to get the list of business within the bounds
    // from the database.
    const discoverNearMeClick = (businesses: Business[]) => {
        setBusinesses(businesses);

        const page = [];

        for (let i = 1; i <= Math.ceil(businesses.length / businessesPerPage); i++) {
            page.push(i);
        };

        setPageNumbers(page);
    };

    // FOR: DiscoverBusinessList
    // If the user clicks on the business image, it will direct them to the business page
    const directToBusinessPage = (business_id: string) => {
        props
            .getBusiness(api, business_id)
            .then((business) => {
                history.push(`/business/${business.id}`);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    const businessListPaginationClick = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    return (
        <div id="kb-discover-page">
            <TopNavBar />
            <KouponBankSideTabBarR />
            <div id="business-list-business-container">
                {currentPageBusinesses.map((business) => {
                    return (
                        <DiscoverBusinessList
                            key={business.id}
                            business={business}
                            directToBusinessPage={directToBusinessPage}
                        />
                    );
                })}
            </div>
            <div id="page-list-container">
                {pageNumbers.map((pageIndex) => {
                    return (
                        <Pagination
                            key={pageIndex}
                            pageIndex={pageIndex}
                            paginationClick={businessListPaginationClick}
                        />
                    );
                })}
            </div>
            <MapR
                mapBoundaries={mapBoundaries}
                discoverNearMeClick={discoverNearMeClick}
            />
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    console.log(state);
    return {
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
        naverMapBound: state.naverMapReducer.naverMapBound,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getAllBusinessWithinNaverMapBounds: async (
            api: KouponBankApi,
            naverMapBound: NaverMapBound,
        ) => {
            return getAllBusinessWithinNaverMapBounds(api, naverMapBound, dispatch);
        },
        getBusiness: async (api: KouponBankApi, business_id: string) => {
            return getBusiness(api, business_id, dispatch);
        },
    };
};

export const DiscoverPageR = connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
