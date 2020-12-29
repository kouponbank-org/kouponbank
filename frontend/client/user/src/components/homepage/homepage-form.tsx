import React, { Props, useState } from "react";
import { useHistory } from "react-router-dom";
import { UrlPaths } from "../base-page-router";
import "./homepage.scss";
import { Business, SearchQueries } from "../../api/kb-types";
import { BusinessList } from "./business-list";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...props
}) => <button {...props}>{children}</button>;

export interface Prop {
    businesses: Business[];
    selectBusiness: (businessId) => void;
    searchQueries: SearchQueries;
}

export const HomepageForm = (props: Prop): JSX.Element => {
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const redirectToDiscoverPage = (event: React.MouseEvent<HTMLElement>): void => {
        history.push(UrlPaths.DiscoverPage);
        event.preventDefault();
    };

    const [searchQueries, setSearchQueries] = useState<SearchQueries>();
    const searchInput = (event: React.FormEvent): void => {
        const target = event.target as HTMLInputElement;
        setSearchQueries({
            ...searchQueries,
            [target.name]: target.value,
        });
    };
    const searchButton = () => {
        history.push(UrlPaths.DiscoverPage);
    }
    console.log(searchQueries)

    return (
        <div className="background-home">
            <div className="search">
                <div className="search-bar">
                    <div className="search-content">
                        <input type="text" className="location" name="location" placeholder="위치 | Location" onChange={searchInput}/>
                        <input type="datetime-local" className="starting-time" name="starting-time" placeholder="시작시간 | Starting time" onChange={searchInput}/>
                        <input type="time" className="period" name="period" placeholder="이용시간 | Period" onChange={searchInput} />
                        <input type="number" className="people" name="people" placeholder="인원 | People" onChange={searchInput} />
                        <Button className="search-button" onClick={searchButton}>Search</Button>
                    </div>
                </div>
                <div className="text">
                    <div className="text-left">
                        <div className="title">Space Shuttle</div>
                        <div className="sub-title">나에게 딱 맞는 공간 찾기</div>
                    </div>
                    <div className="text-right">
                        <div className="description">TEXT FIELD 24 - text field is going to be a general explanation of the service maybe.. a slight introduction to how to use this app. User would go through steps to find the ideal location/cafe using this service. Blah blah blah so much more </div>
                    </div>
                </div>
                <Button className="button" onClick={redirectToDiscoverPage}>Discover More</Button>
            </div>
            <div className="recommend">
                <div className="text">
                    <div className="title">집중이 안되는 날</div>
                    <div className="sub-title">MD 추천 공간</div>
                </div>
                <div className="business">
                    {props.businesses.map((business) => {
                        return <BusinessList key={business.id} business={business} selectBusiness={props.selectBusiness} />;
                    })}
                </div>
                <Button className="button">Discover More</Button>
            </div>
        </div>
    );
};
