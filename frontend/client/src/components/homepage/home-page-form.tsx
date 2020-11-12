import React from "react";
import { Business } from "../../api/kb-types";
import { MapR } from "../naver-map/map";
import { BusinessTableR } from "./business-table/business-table";
import "./homepage.scss";

export interface Prop {
    businesses: Business[];
    selectBusiness: (businessId) => void;
}

export const HomepageForm = (props: Prop): JSX.Element => {
    return (
        <div className="layout">
            <div>
                {props.businesses.map((business) => {
                    return (
                        <BusinessTableR
                            key={business.id}
                            business={business}
                            selectBusiness={props.selectBusiness}
                        />
                    );
                })}
            </div>
            <MapR />
        </div>
    );
};