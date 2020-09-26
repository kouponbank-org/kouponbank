import React, { useState } from "react";
import { Marker, NaverMap } from "react-naver-maps";
import { BusinessCoordinates } from "../../api/kb-types";

export interface Prop {

};

export const NaverMapMarker = (props: Prop) => {
    const [naverMapBounds, setNaverMapBounds] = useState({
        latSpan: null,
        lngSpan: null
    });
    /*testing coordinate map*/
    const coord1 : BusinessCoordinates = {
        businessTitle: "성현",
        lat: 37.3093,
        lng: 127.0858
    }

    const coord2 : BusinessCoordinates = {
        businessTitle: "지원",
        lat: 37.308,
        lng: 127.0849
    }
    
    const testCoord : BusinessCoordinates[] = [coord1, coord2]
    /*testing coordinate map*/

    const changeBounds = (bounds) => {
        Object.entries(bounds).forEach(([key, value]) => {
            setNaverMapBounds({
                ...naverMapBounds,
                [key]: value
            });
        })
    }

    const handleChangeBounds = (bounds) => {
        const mapSpan = {
            latSpan: bounds.getNE().lat() - bounds.getSW().lat(),
            lngSpan: bounds.getNE().lng() - bounds.getSW().lng()
        }
        changeBounds(mapSpan);
        console.log(mapSpan)
    }; 

    return (
        <div>
            <NaverMap
                className="naver-map"
                id="react-naver-map"
                style={{
                    width: 500,
                    height: 500
                }}
                defaultCenter={{ lat: 37.3093, lng: 127.0858 }}
                defaultZoom={14}
                onBoundsChanged={handleChangeBounds}
            >
                { 
                    testCoord.map((coordinate, index) => {
                        return (
                            <Marker 
                                key={index}
                                position={{
                                    lat: coordinate.lat, 
                                    lng: coordinate.lng
                                }}
                                onClick={() => {
                                    alert(coordinate.businessTitle)
                                }}
                            />
                        )
                    })
                }
            </NaverMap>
        </div>
    )
}