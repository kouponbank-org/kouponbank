import './discover-page.scss';

import React from 'react';

import { KouponBankApi } from '../../api/kb-api';
import { Business, NaverMapBound } from '../../api/kb-types';
import { CopyRight } from '../common-components/copyright/copyright';
import { Pagination } from '../common-components/pagination/pagination';
import { DiscoverBusinessList } from './discover-list-business';
import { MapR } from './naver-map/map';

/**
 * Represents the required properties of the HomePage.
 */
export interface Prop {
    businesses: Business[];
    naverMapBound: NaverMapBound;
    searchedBusiness: Business[];
    getAllBusinessWithinNaverMapBounds: (
        api: KouponBankApi,
        naverMapBound: NaverMapBound,
    ) => Promise<Business[]>;
    getBusiness: (api: KouponBankApi, businessId: string) => Promise<Business>;
    directToBusinessPage: (businessId: string) => void;
    currentPageBusinesses: Business[];
    pageNumbers: number[];
    businessListPaginationClick: (pageIndex: number) => void;
    discoverNearMeClick: (businesses: Business[]) => void;
}

export const DiscoverPageFilterForm: React.FC<Prop> = (props: Prop) => {
    // // May need to turn this into useState
    const mapBoundaries = { width: "100%", height: `${window.innerHeight - 120}px` };

    //TODO: For now, I set it to be conditional 
    // the map searching feature of discover page and searching from the homepage.
    // it should be combined together. 

    const redirectToDiscoverFilterPage = () => {
        console.log("redirect to filter page")
    };

    return (
        <div id="discover-page-main-contents-container">
            <div id="left-content-container">
                <button onClick={redirectToDiscoverFilterPage}></button>
                <div id="left-main-content-container">
                    <div id="business-list-main-container">
                        <div id="business-list-container">
                            {
                                props.searchedBusiness.length != 0 ? (
                                    props.searchedBusiness.map((business) => {
                                        return (
                                            <DiscoverBusinessList
                                                key={business.id}
                                                business={business}
                                                directToBusinessPage={props.directToBusinessPage}
                                            />
                                        );
                                    })
                                ):(
                                    props.currentPageBusinesses.map((business) => {
                                        return (
                                            <DiscoverBusinessList
                                                key={business.id}
                                                business={business}
                                                directToBusinessPage={props.directToBusinessPage}
                                            />
                                        );
                                    })
                                )
                            }
                            {/* {props.searchedBusiness.map((business) => {
                                return (
                                    <DiscoverBusinessList
                                        key={business.id}
                                        business={business}
                                        directToBusinessPage={directToBusinessPage}
                                    />
                                );
                            })} */}
                            {/* {currentPageBusinesses.map((business) => {
                                return (
                                    <DiscoverBusinessList
                                        key={business.id}
                                        business={business}
                                        directToBusinessPage={directToBusinessPage}
                                    />
                                );
                            })} */}
                        </div>
                    </div>
                    <div id="page-list-container">
                        {props.pageNumbers.map((pageIndex) => {
                            return (
                                <Pagination
                                    key={pageIndex}
                                    pageIndex={pageIndex}
                                    paginationClick={props.businessListPaginationClick}
                                />
                            );
                        })}
                    </div>
                </div>
                <CopyRight />
            </div>
            <div id="right-content-container">
                <div id="discover-page-map">
                    <MapR
                        mapBoundaries={mapBoundaries}
                        discoverNearMeClick={props.discoverNearMeClick}
                    />
                </div>
            </div>
        </div>
    );
};
