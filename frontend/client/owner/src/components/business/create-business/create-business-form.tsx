import "./create-business.scss";

import React, { useState } from "react";

import { Button, Dialog, TextField } from "@material-ui/core";

import { AddressDetail, Business, BusinessAddress, BusinessDetail } from "../../../api/kb-types";
import { AddressInput } from "../../address/address";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
    businessDetail: BusinessDetail;
    businessAddress: BusinessAddress;
    businessCreateInput: (event) => void;
    businessDetailCreateInput: (event) => void;
    handleSelectAddressClick: (address: AddressDetail, addressCoord: AddressDetail) => void;
    createBusinessClick: (event) => void;
}

export const CreateBusinessForm = (props: Prop): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleSelectAddressClick = (address: AddressDetail, addressCoord: AddressDetail) => {
        props.handleSelectAddressClick(address, addressCoord);
        setOpen(false);
    };

    return (
        <div className="layout">
            <div className="grid-container">
                <div className="business-name">
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="business_name"
                        id="business_name"
                        label="Business Name"
                        autoComplete="off"
                        type="text"
                        onChange={props.businessCreateInput}
                        value={props.business.business_name}
                    />
                </div>
                <div className="business-email">
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="business_email"
                        id="business_email"
                        label="Business Email"
                        autoComplete="off"
                        type="text"
                        onChange={props.businessDetailCreateInput}
                        value={props.businessDetail.business_email}
                    />
                </div>
                <div className="business-number">
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="business_number"
                        id="business_number"
                        label="Business Number"
                        autoComplete="off"
                        type="text"
                        onChange={props.businessCreateInput}
                        value={props.business.business_number}
                    />
                </div>
                <div className="business-description">
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="business_description"
                        id="business_description"
                        label="Business Description"
                        autoComplete="off"
                        type="text"
                        onChange={props.businessCreateInput}
                        value={props.business.business_description}
                    />
                </div>
                <div className="search-address-modal">
                    <Button
                        color="inherit"
                        onClick={() => setOpen(true)}
                        className="search-address-modal button"
                    >
                        Find Address
                    </Button>
                </div>
                <div className="road-address">
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        required
                        name="roadAddress"
                        id="roadAddress"
                        defaultValue="도로명 주소"
                        label="Road Address"
                        autoComplete="off"
                        type="text"
                        value={props.businessAddress.roadAddr || ""}
                    />
                </div>
                <div className="jibun-address">
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        required
                        name="jibunAddress"
                        id="jibunAddress"
                        defaultValue="지번 주소"
                        label="Jibun Address"
                        autoComplete="off"
                        type="text"
                        value={props.businessAddress.jibunAddr || ""}
                    />
                </div>
                <div className="zipcode">
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        required
                        name="zipcode"
                        id="zipcode"
                        defaultValue="우편번호"
                        label="Zipcode"
                        autoComplete="off"
                        type="text"
                        value={props.businessAddress.zipNo || ""}
                    />
                </div>
                <form onSubmit={props.createBusinessClick} autoComplete="off">
                    <div className="create-business-button">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="search-address-button"
                        >
                            Create Business
                        </Button>
                    </div>
                </form>
            </div>
            <Dialog
                fullWidth={true}
                maxWidth="xl"
                scroll="body"
                open={open}
                onClose={() => setOpen(false)}
                className="search-address-modal modal"
            >
                <AddressInput handleSelectAddressClick={handleSelectAddressClick} />
            </Dialog>
        </div>
    );
};
