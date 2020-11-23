import { TableCell, TableRow, TextField } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { KouponBankApi } from "../../../api/kb-api";
import { Business, User } from "../../../api/kb-types";
import { getBusiness, getBusinessesFromSearch, initialState } from "../../../store/business/business-reducer";
import { RootReducer } from "../../../store/reducer";
import { ApiContext } from "../../base-page-router";
import { SearchedBusinessList } from "./business-search-list";
import "./business-search.scss";

export interface Prop {
    open: boolean;
    user?: User;
    getBusinessesFromSearch: (api: KouponBankApi, char: string) => Promise<Business[]>;
    getBusiness: (
        api: KouponBankApi,
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
        props.getBusiness(api, businessId);
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
                        name="business search"
                        label="Business Search"
                        autoComplete="off"
                        type="text"
                        onChange={searchBusinessInput}
                        value={businessName}
                    />
                </div>
                <div className="searched-business-list">
                    <TableRow>
                        <TableCell>Business Picture</TableCell>
                        <TableCell align="right">Business Name</TableCell>
                        <TableCell align="right">Business Address</TableCell>
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
        getBusiness: (
            api: KouponBankApi,
            businessId: string,
        ) => {
            return getBusiness(api, businessId, dispatch);
        },
    };
};

export const SearchBusinessR = connect(mapStateToProps, mapDispatchToProps)(SearchBusiness);
