import "./discover-page.scss";

import React from "react";

export interface Prop {}

//TODO: NEED to have functions.
//For now, its only a base front visual.
export const DiscoverPageFilter: React.FC<Prop> = (props: Prop) => {
    return (
        <div id="homepage-row3-column1">
            <div id="homepage-row3-column1-row">
                <div id="homepage-row3-column1-row-filter-text-container">
                    <div id="homepage-row3-column1-row-filter-text-container-text">
                        상세위치를 골라보세요
                    </div>
                </div>
                <div id="homepage-row3-column1-row-filter-list-container">
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="distance1"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="distance1"
                        >
                            ㅇㅇ동
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="distance2"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="distance2"
                        >
                            ㅇㅇ동
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="distance3"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="distance3"
                        >
                            ㅇㅇ동
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="distance4"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="distance4"
                        >
                            ㅇㅇ동
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="distance5"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="distance5"
                        >
                            ㅇㅇ동
                        </label>
                    </div>
                </div>
            </div>

            <div id="homepage-row3-column1-row">
                <div id="homepage-row3-column1-row-filter-text-container">
                    <div id="homepage-row3-column1-row-filter-text-container-text">
                        편의사항을 선택해보세요
                    </div>
                </div>
                <div id="homepage-row3-column1-row-filter-list-container">
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="feature1"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="feature1"
                        >
                            콘센트
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="feature2"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="feature2"
                        >
                            벽쪽
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="feature3"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="feature3"
                        >
                            와이파이
                        </label>
                    </div>
                </div>
            </div>

            <div id="homepage-row3-column1-row">
                <div id="homepage-row3-column1-row-filter-text-container">
                    <div id="homepage-row3-column1-row-filter-text-container-text">
                        이용인원을 선택해보세요
                    </div>
                </div>
                <div id="homepage-row3-column1-row-filter-list-container">
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="capacity1"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="capacity1"
                        >
                            1인
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="capacity2"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="capacity2"
                        >
                            2인
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="capacity3"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="capacity3"
                        >
                            3인
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="capacity4"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="capacity4"
                        >
                            4인
                        </label>
                    </div>
                    <div id="homepage-row3-column1-row-filter-list-container-row">
                        <input
                            type="checkbox"
                            id="homepage-row3-column1-row-filter-list-container-checkbox"
                            name="capacity5"
                        />
                        <label
                            id="homepage-row3-column1-row-filter-list-container-text"
                            htmlFor="capacity5"
                        >
                            5인+
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
