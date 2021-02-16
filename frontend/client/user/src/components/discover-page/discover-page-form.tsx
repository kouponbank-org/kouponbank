import "./discover-page.scss";

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { KouponBankApi } from "../../api/kb-api";
import { Business, NaverMapBound } from "../../api/kb-types";
import { ApiContext } from "../base-page-router";
import { CopyRight } from "../common-components/copyright/copyright";
import { Pagination } from "../common-components/pagination/pagination";
import { DiscoverPageFilter } from "./discover-filter";
import { DiscoverBusinessList } from "./discover-list-business";
import { MapR } from "./naver-map/map";

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    naverMapBound: NaverMapBound;
    searchedBusiness: Business[];
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
}

export const DiscoverPageForm: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPageBusinesses, setCurrentPageBusinesses] = useState<Business[]>([]);

    // Variable for setting pagination values
    // Play around with the values in discover page and you will see :)
    const businessesPerPage = 10;

    // May need to turn this into useState
    const mapBoundaries = { width: "100%", height: `${window.innerHeight - 120}px` };

    //For now, the filter view and map view can be switched by the button.
    // need to be changed
    const [filterView, setfilterView] = React.useState(false);

    const filterViewStatus = () => {
        if (filterView) {
            setfilterView(false);
        } else {
            setfilterView(true);
        }
    };

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
        }

        setPageNumbers(page);
    };

    // FOR: DiscoverBusinessList
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

    const businessListPaginationClick = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };

    //TODO: For now, I set the map searching feature to be conditional:
    // IF: searched from the homepage, use searched business.map
    // ESLE: map searching
    // should be combined together.

    return (
        <div id="discover-page-main-contents-container">
            <div id="left-content-container">
                {!filterView ? (
                    <button onClick={filterViewStatus}> 필터보기 </button>
                ) : (
                    <button onClick={filterViewStatus}> 지도보기 </button>
                )}

                <div id="left-main-content-container">
                    <div id="business-list-main-container">
                        <div id="business-list-container">
                            {props.searchedBusiness.length != 0
                                ? props.searchedBusiness.map((business) => {
                                      return (
                                          <DiscoverBusinessList
                                              key={business.id}
                                              business={business}
                                              directToBusinessPage={directToBusinessPage}
                                          />
                                      );
                                  })
                                : currentPageBusinesses.map((business) => {
                                      return (
                                          <DiscoverBusinessList
                                              key={business.id}
                                              business={business}
                                              directToBusinessPage={directToBusinessPage}
                                          />
                                      );
                                  })}
                        </div>
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
                </div>
                <CopyRight />
            </div>
            <div id="right-content-container">
                {!filterView ? (
                    <div id="discover-page-map">
                        <MapR
                            mapBoundaries={mapBoundaries}
                            discoverNearMeClick={discoverNearMeClick}
                        />
                    </div>
                ) : (
                    <div id="discover-page-filter-view">
                        <DiscoverPageFilter />
                    </div>
                )}
            </div>
        </div>
    );
};
