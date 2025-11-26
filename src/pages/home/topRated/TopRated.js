import React, { useState } from "react";
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../component/switchTabs/SwitchTabs";
import Carousel from "../../../component/carousel/Carousel";

const TopRated = ({ movieData, tvData }) => {
    const [endpoint, setEndpoint] = useState("movie");

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    const activeData = endpoint === "movie" ? movieData : tvData;

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>

            <Carousel
                data={activeData?.results}
                loading={!activeData}
                endpoint={endpoint}
            />
        </div>
    );
};

export default TopRated;
