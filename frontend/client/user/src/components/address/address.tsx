import "./address.scss";

import React, { useContext, useState } from "react";

import { Button, TableCell, TableRow, TextField } from "@material-ui/core";

import { KouponBankApi } from "../../api/kb-api";
import { AddressDetail } from "../../api/kb-types";
import { getAddressCoord, getAddressSearchResult } from "../../store/naver-map/naver-map-reducer";
import { ApiContext } from "../base-page-router";
import { AddressTable } from "./address-table";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    handleSelectAddressClick: (address: AddressDetail, addressCoord: AddressDetail) => void;
}

export const AddressInput: React.FC<Prop> = (props: Prop) => {
    const api = useContext<KouponBankApi>(ApiContext);
    const [address, setAddress] = useState("");
    /**
     * 1) 지번주소 (jibunAddr)
     * 2) 도로명주소 (roadAddr)
     * 3) 건물명 (bdNm)
     * 4) 우편번호 (zipNo)
     */
    const [searchedAddress, setSearchedAddress] = useState<AddressDetail[]>([]);

    /* User Input of the Address */
    const setAddressInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAddress(event.target.value);
    };

    /**
     * Returns List of Addresses based on the Address the User has typed in
     * Calls the Address API set by www.juso.go.kr
     * @param event
     */
    const findAddress = (event: React.FormEvent<HTMLFormElement>) => {
        getAddressSearchResult(api, address)
            .then((address) => {
                setSearchedAddress(address);
            })
            .catch(() => {
                // Currently does nothing
            });
        event.preventDefault();
    };

    /**
     * Calls the Coordinate API set by www.juso.go.kr
     * Address will contain X and Y coordinates of the location
     * X, Y is set in UTM-K format
     * Backend server transforms UTM-K into WGS84 (lat, lng)
     * @param address
     */
    const findAddressCoord = (address: AddressDetail) => {
        getAddressCoord(api, address)
            .then((addressCoord) => {
                props.handleSelectAddressClick(address, addressCoord);
            })
            .catch(() => {
                // Currently does nothing
            });
    };

    return (
        <div className="layout">
            <div className="grid-container-address">
                <div className="address-input">
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="주소 검색"
                        id="주소 검색"
                        label="주소 검색"
                        autoComplete="off"
                        type="text"
                        onChange={setAddressInput}
                        value={address}
                    />
                </div>
                <div className="address-search-button">
                    <form onSubmit={findAddress} autoComplete="off">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="address-search-button button"
                        >
                            Search Address
                        </Button>
                    </form>
                </div>
                <div className="searched-address-list">
                    <TableRow>
                        <TableCell>ZipCode</TableCell>
                        <TableCell align="right">Jibun Address</TableCell>
                        <TableCell align="right">Road Address</TableCell>
                        <TableCell align="right">Building Name</TableCell>
                    </TableRow>
                </div>
            </div>
            <div>
                {searchedAddress.map((address, index) => {
                    return (
                        <AddressTable
                            key={index}
                            address={address}
                            handleSelectAddressClick={findAddressCoord}
                        />
                    );
                })}
            </div>
        </div>
    );
};
