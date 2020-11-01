import React from "react";
import { Marker } from "react-naver-maps";
import { Business } from "../../api/kb-types";

export interface Prop {
    businesses: Business[];
}

export const MapMarker = (props: Prop): JSX.Element => {
    return (
        <div>
            {props.businesses
                ? props.businesses.map((business, index) => {
                      return (
                          <Marker
                              key={index}
                              position={{
                                  lat: business.entY,
                                  lng: business.entX,
                              }}
                              animation={1}
                              onClick={() => {
                                  alert(business.roadAddr);
                              }}
                          />
                      );
                  })
                : ""}
        </div>
    );
};
