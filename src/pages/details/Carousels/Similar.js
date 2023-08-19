import React from 'react';
import Carousel from '../../../component/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movies';

    let content;

    if (loading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p>Error: {error.message}</p>;
    } else {
        content = (
            <Carousel
                title={title}
                data={data?.results || []}
                loading={loading}
                endpoint={mediaType}
            />
        );
    }
    

    return <div>
      {content}

      {data?.results?.length === 0 && !loading && (
      <p style={{ color: 'white', textAlign: 'center', fontSize: '16px' }}>
          No Similar Content available For this  {mediaType}
      </p>
  )}
    
    </div>;
};

export default Similar;
