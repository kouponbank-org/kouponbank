import React from "react";
import { Marker } from "react-naver-maps";
import { BusinessLocation } from "../../api/kb-types";

export interface Prop {
    businessLocations: BusinessLocation[];
}

export const MapMarker = (props: Prop): JSX.Element => {
    return (
        <div>
            {props.businessLocations
                ? props.businessLocations.map((business, index) => {
                      return (
                          <Marker
                              key={index}
                              position={{
                                  lat: business.y,
                                  lng: business.x,
                              }}
                              animation={1}
                              onClick={() => {
                                  alert(business.roadAddress);
                              }}
                          />
                      );
                  })
                : ""}
        </div>
    );
};
