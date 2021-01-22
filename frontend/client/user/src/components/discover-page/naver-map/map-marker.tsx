import React from "react";
import { Marker } from "react-naver-maps";

import { Business } from "../../../api/kb-types";

export interface Prop {
    naverMapBusinesses: Business[];
    directToBusinessPage: (businessId: string) => void;
}

export const MapMarker = (props: Prop): JSX.Element => {
    return (
        <div>
            {props.naverMapBusinesses
                ? props.naverMapBusinesses.map((naverMapBusiness, index) => {
                      return (
                          <Marker
                              key={index}
                              position={{
                                  lat: naverMapBusiness.business_address.entY,
                                  lng: naverMapBusiness.business_address.entX,
                              }}
                              onClick={() => {
                                  props.directToBusinessPage(naverMapBusiness.id);
                              }}
                          />
                      );
                  })
                : ""}
        </div>
    );
};
