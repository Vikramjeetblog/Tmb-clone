import React, { useEffect, useState } from "react";
import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

import { fetchDataFromApi } from "../../utils/api";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Home = () => {
    // All data states
    const [bannerData, setBannerData] = useState(null);

    const [trendingDay, setTrendingDay] = useState(null);
    const [trendingWeek, setTrendingWeek] = useState(null);

    const [popularMovies, setPopularMovies] = useState(null);
    const [popularTv, setPopularTv] = useState(null);

    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [topRatedTv, setTopRatedTv] = useState(null);

    // Load all API data sequentially
    const loadHomeData = async () => {
        console.log("Loading TMDB home page data...");

        // Hero Banner (Upcoming movies)
        const banner = await fetchDataFromApi("/movie/upcoming");
        setBannerData(banner);
        await delay(200);

        // Trending: Day
        const tDay = await fetchDataFromApi("/trending/movie/day");
        setTrendingDay(tDay);
        await delay(200);

        // Trending: Week
        const tWeek = await fetchDataFromApi("/trending/movie/week");
        setTrendingWeek(tWeek);
        await delay(200);

        // Popular Movies
        const pMovie = await fetchDataFromApi("/movie/popular");
        setPopularMovies(pMovie);
        await delay(200);

        // Popular TV
        const pTv = await fetchDataFromApi("/tv/popular");
        setPopularTv(pTv);
        await delay(200);

        // Top Rated Movies
        const trMovie = await fetchDataFromApi("/movie/top_rated");
        setTopRatedMovies(trMovie);
        await delay(200);

        // Top Rated TV
        const trTv = await fetchDataFromApi("/tv/top_rated");
        setTopRatedTv(trTv);
    };

    useEffect(() => {
        loadHomeData();
    }, []);

    return (
        <div className="homePage">
            <HeroBanner data={bannerData} />

            <Trending dayData={trendingDay} weekData={trendingWeek} />

            <Popular movieData={popularMovies} tvData={popularTv} />

            <TopRated movieData={topRatedMovies} tvData={topRatedTv} />
        </div>
    );
};

export default Home;
