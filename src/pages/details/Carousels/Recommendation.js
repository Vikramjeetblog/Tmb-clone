import React from 'react';
import Carousel from '../../../component/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    let content;

    if (loading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p>Error: {error.message}</p>;
    } else if (data?.results && data.results.length > 0) {
        content = (
            <Carousel
                title="Recommendations"
                data={data.results}
                loading={loading}
                endpoint={mediaType}
            />
        );
    } else {
        content = (
            <p style={{ color: 'white', textAlign: 'center', fontSize: '16px' }}>
                No recommendations found for this {mediaType}.
            </p>
        );
    }

    return <div>{content}</div>;
};

export default Recommendation;
