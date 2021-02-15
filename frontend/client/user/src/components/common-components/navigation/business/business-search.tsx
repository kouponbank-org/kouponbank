import "./business-search.scss";

import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";

import { KouponBankApi } from "../../../../api/kb-api";
import { BusinessFilterDetail } from "../../../../api/kb-types";
import { getBusinessesFromSearch } from "../../../../store/business/business-reducer";
import { RootReducer } from "../../../../store/reducer";
import { ApiContext, UrlPaths } from "../../../base-page-router";

export interface Prop {
    getBusinessesFromSearch: (
        api: KouponBankApi,
        businessFilterDetail: BusinessFilterDetail,
    ) => Promise<void>;
}

export const SearchBusiness: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [businessFilter, setBusinessFilter] = useState<BusinessFilterDetail>();

    const searchBusinessInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setBusinessFilter({
            ...businessFilter,
            [target.name]: target.value,
        });
    };

    //FOR: Search with Filter
    const filterSearchClick = (event: React.MouseEvent<HTMLElement>): void => {
        props
            .getBusinessesFromSearch(api, businessFilter)
            .then(() => {
                history.push(UrlPaths.DiscoverPage);
            })
            .catch(() => {
                // Nothing here for now
            });
        event.preventDefault();
    };

    return (
        <div className="layout">
            <div className="grid-container-address">
                <input
                    type="date"
                    name="date"
                    id="search-bar-input1"
                    placeholder="date"
                    onChange={searchBusinessInput}
                />
                <input
                    type="time"
                    name="start_time"
                    id="search-bar-input2"
                    placeholder="start_time"
                    onChange={searchBusinessInput}
                />
                <input
                    type="time"
                    name="end_time"
                    id="search-bar-input3"
                    placeholder="end_time"
                    onChange={searchBusinessInput}
                />
                <input
                    type="number"
                    name="guest"
                    id="search-bar-input4"
                    placeholder="guest"
                    onChange={searchBusinessInput}
                />
                <input
                    type="text"
                    name="siNm"
                    id="search-bar-input5"
                    placeholder="siNm"
                    onChange={searchBusinessInput}
                />
                <input
                    type="text"
                    name="sggNm"
                    id="search-bar-input6"
                    placeholder="sggNm"
                    onChange={searchBusinessInput}
                />
                <input
                    type="text"
                    name="emdNm"
                    id="search-bar-input7"
                    placeholder="emdNm"
                    onChange={searchBusinessInput}
                />
                <button onClick={filterSearchClick}> 검색하기 </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        searchedBusiness: state.businessReducer.searchedBusinesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getBusinessesFromSearch: async (
            api: KouponBankApi,
            businessFilterDetail: BusinessFilterDetail,
        ) => {
            return getBusinessesFromSearch(api, businessFilterDetail, dispatch);
        },
    };
};

export const SearchBusinessR = connect(mapStateToProps, mapDispatchToProps)(SearchBusiness);
