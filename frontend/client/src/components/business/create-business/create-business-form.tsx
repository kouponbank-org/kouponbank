import { Button, Dialog, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { AddressDetail, Business } from "../../../api/kb-types";
import { AddressInput } from "../../address/address";
import "./create-business.scss";

/**
 * Represents the required properties of the log in form.
 */
export interface Prop {
    business: Business;
    businessInformationInput: (event) => void;
    setBusinessAddress: (address: AddressDetail, addressCoord: AddressDetail) => void;
    createBusinessClick: (event) => void;
}

export const CreateBusinessForm = (props: Prop): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleSelectAddressClick = (address: AddressDetail, addressCoord: AddressDetail) => {
        props.setBusinessAddress(address, addressCoord);
        setOpen(false);
    };

    // 사업장 정보 (이름, 이메일)
    const businessInformationInput = (event): void => {
        props.businessInformationInput(event);
    };

    // 사업장 가입하기 클립
    const createBusinessClick = (event: React.FormEvent<HTMLFormElement>): void => {
        props.createBusinessClick(event);
        event.preventDefault();
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
                        onChange={businessInformationInput}
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
                        onChange={businessInformationInput}
                        value={props.business.business_email}
                    />
                </div>
                <div className="business-description">
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="description"
                        id="description"
                        label="Business Description"
                        autoComplete="off"
                        type="text"
                        onChange={businessInformationInput}
                        value={props.business.description}
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
                        value={props.business.roadAddr || ""}
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
                        value={props.business.jibunAddr || ""}
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
                        value={props.business.zipNo || ""}
                    />
                </div>
                <form onSubmit={createBusinessClick} autoComplete="off">
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
