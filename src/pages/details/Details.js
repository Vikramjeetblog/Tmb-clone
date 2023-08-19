import React from 'react'
import { useParams } from "react-router-dom";
import "./style.scss";
import Similar from './Carousels/Similar';
import Recommendation from './Carousels/Recommendation';
import VideoSection from './videoSection/VideoSection';
import Cast from './cast/Cast';
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';




const Details = () => {
  const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast  data={credits?.cast} loading={creditsLoading}/>
      <VideoSection  data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation  mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details