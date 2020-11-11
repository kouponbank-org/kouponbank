import { TableCell, TableRow, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../../api/kb-api";
import { User, Business } from "../../../api/kb-types";
import { getOwnerBusiness, getBusinessesFromSearch, initialState } from "../../../store/business/business-reducer";
import { RootReducer } from "../../../store/reducer";
import { ApiContext } from "../../base-page-router";
import { SearchedBusinessList } from "./business-search-list";
import { useHistory } from "react-router-dom";
import "./business-search.scss";

export interface Prop {
    open: boolean;
    user?: User;
    getBusinessesFromSearch: (api: KouponBankApi, char: string) => Promise<Business[]>;
    getOwnerBusiness: (
        api: KouponBankApi,
        userId: string,
        businessId: string,
    ) => Promise<Business>;
}

export const SearchBusiness: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const history = useHistory();
    const [businessName, setBusinessName] = useState("");
    const [businessList, setBusinessList] = useState<Business[]>(initialState.searchedBusinesses);

    const searchBusinessInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessName(event.target.value);
    };

    useEffect(() => {
        props
            .getBusinessesFromSearch(api, businessName)
            .then((searchedBusinesses) => {
                setBusinessList(searchedBusinesses);
            })
            .catch(() => {
                // Currently does nothing
            });
    }, [businessName]);

    const selectBusiness = (businessId) => {
        props.getOwnerBusiness(api, props.user.id, businessId);
        history.push(`/business/${businessId}`);
    }

    return (
        <div className="layout">
            <div className="grid-container-address">
                <div className="business-input">
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="사업장 검색"
                        id="사업장 검색"
                        label="사업장 검색"
                        autoComplete="off"
                        type="text"
                        onChange={searchBusinessInput}
                        value={businessName}
                    />
                </div>
                <div className="searched-business-list">
                    <TableRow>
                        <TableCell>사업장 사진</TableCell>
                        <TableCell align="right">사업장 이름</TableCell>
                        <TableCell align="right">사업장 주소</TableCell>
                    </TableRow>
                </div>
            </div>
            <div>
                {businessList.map((business) => {
                    return <SearchedBusinessList 
                        key={business.id} 
                        business={business}
                        selectBusiness={selectBusiness}
                          />;
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.userReducer.user,
        searchedBusiness: state.businessReducer.searchedBusinesses,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getBusinessesFromSearch: async (api: KouponBankApi, char: string) => {
            return getBusinessesFromSearch(api, char, dispatch);
        },
        getOwnerBusiness: (
            api: KouponBankApi,
            userId: string,
            businessId: string,
        ) => {
            return getOwnerBusiness(api, userId, businessId, dispatch);
        },
    };
};

export const SearchBusinessR = connect(mapStateToProps, mapDispatchToProps)(SearchBusiness);
