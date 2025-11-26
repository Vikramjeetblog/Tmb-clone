import React, { useState } from "react";
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../component/switchTabs/SwitchTabs";
import Carousel from "../../../component/carousel/Carousel";

const Trending = ({ dayData, weekData }) => {
    const [endpoint, setEndpoint] = useState("day");

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    const activeData = endpoint === "day" ? dayData : weekData;

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>

                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>

            <Carousel
                data={activeData?.results}
                loading={!activeData}
            />
        </div>
    );
};

export default Trending;
