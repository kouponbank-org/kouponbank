import { Button, TableCell, TableRow, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { KouponBankApi } from "../../api/kb-api";
import { getJusoSearchResult } from "../../store/naver-map/naver-map-reducer";
import { ApiContext } from "../base-page-router";
import { AddressTable } from "./address-table";
import "./address.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop { 
    selectedAddress: (address) => void;
}

export const AddressInput = (props: Prop) => { 
    const api = useContext<KouponBankApi>(ApiContext);
    const [address, setAddress] = useState("");
    const [searchedAddress, setSearchedAddress] = useState([]);

    const setAddressInput = (event) => {
        setAddress(event.target.value);
    };

    const findAddress = (event) => {
        getJusoSearchResult(api, address).then(address => {
            setSearchedAddress(address)
        })
        event.preventDefault()
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
                            주소 검색
                        </Button>
                    </form>
                </div>
                <div className="searched-address-list">
                    <TableRow>
                        <TableCell>우편번호</TableCell>
                        <TableCell align="right">지번주소</TableCell>
                        <TableCell align="right">도로명주소</TableCell>
                        <TableCell align="right">건물명</TableCell>
                    </TableRow>
                </div>
            </div>
            <div>
                { 
                    searchedAddress.map((address, index) => {
                        return (
                            <AddressTable 
                                key={index}
                                jibunAddress={address.jibunAddr}
                                roadAddress={address.roadAddr}
                                buildingName={address.bdNm}
                                zipcode={address.zipNo}
                                selectedAddress={props.selectedAddress}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
