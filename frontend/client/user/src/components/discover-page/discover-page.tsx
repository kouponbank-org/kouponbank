import './discover-page.scss';

import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';

import { KouponBankApi } from '../../api/kb-api';
import { Business, NaverMapBound } from '../../api/kb-types';
import { getBusiness } from '../../store/business/business-reducer';
import { getAllBusinessWithinNaverMapBounds } from '../../store/naver-map/naver-map-reducer';
import { RootReducer } from '../../store/reducer';
import { ApiContext } from '../base-page-router';
import { KouponBankSideTabBarR } from '../common-components/navigation/navigation-side-tab-bar';
import { TopNavBar } from '../common-components/navigation/navigation-top-bar';
import { DiscoverPageForm } from './discover-page-form';

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
}

export const DiscoverPage: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPageBusinesses, setCurrentPageBusinesses] = useState<Business[]>([]);

    // Variable for setting pagination values
    // Play around with the values in discover page and you will see :)
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

    //TODO: For now, I set it to be conditional 
    // the map searching feature of discover page and searching from the homepage.
    // it should be combined together. 

    return (
        <div id="kb-discover-page">
            <KouponBankSideTabBarR />
            <div id="kb-discover-page-top-nav-main-contents-container">
                <TopNavBar />
                <main id="kb-discover-page-main-contents-margin-control-container">
                    <DiscoverPageForm 
                        businesses={businesses}
                        naverMapBound={props.naverMapBound}
                        searchedBusiness={props.searchedBusiness}
                        getAllBusinessWithinNaverMapBounds={props.getAllBusinessWithinNaverMapBounds}
                        getBusiness={props.getBusiness}
                        directToBusinessPage={directToBusinessPage}
                        currentPageBusinesses={currentPageBusinesses}
                        pageNumbers={pageNumbers}
                        businessListPaginationClick={businessListPaginationClick}
                        discoverNearMeClick={discoverNearMeClick} 
                    />
                </main>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        business: state.businessReducer.business,
        businesses: state.businessReducer.businesses,
        naverMapBound: state.naverMapReducer.naverMapBound,
        searchedBusiness: state.businessReducer.searchedBusinesses,
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
        getBusiness: async (api: KouponBankApi, businessId: string) => {
            return getBusiness(api, businessId, dispatch);
        },
    };
};

export const DiscoverPageR = connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
