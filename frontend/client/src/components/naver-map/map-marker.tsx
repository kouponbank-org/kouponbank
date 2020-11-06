import React from "react";
import { Marker } from "react-naver-maps";
import { Business } from "../../api/kb-types";

export interface Prop {
    naverMapBusinesses: Business[];
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
                                  lat: naverMapBusiness.entY,
                                  lng: naverMapBusiness.entX,
                              }}
                              onClick={() => {
                                  alert(naverMapBusiness.roadAddr);
                              }}
                          />
                      );
                  })
                : ""}
        </div>
    );
};
