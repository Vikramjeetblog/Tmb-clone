import React from 'react';
import './style.scss';

import ContentWrapper from '../../../component/contentWrapper/ContentWrapper';
import Img from '../../../component/lazyLoadImage/Img';
import { useSelector } from 'react-redux';
import avatar from "../../../assests/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    let content;

    if (!loading && data && data.length > 0) {
        content = (
            <div className="listItems">
                {data.map((item) => {
                    let imgUrl = item.profile_path
                        ? url.profile + item.profile_path
                        : avatar;
                    return (
                        <div key={item.id} className="listItem">
                            <div className="profileImg">
                                <Img src={imgUrl} />
                            </div>
                            <div className="name">{item.name}</div>
                            <div className="character">
                                {item.character}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        content = (
            <div style={{ color: 'white', textAlign: 'center', fontSize: '16px' }}>
                Information about the cast for this is not available.
            </div>
        );
    }

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {loading ? (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                ) : (
                    content
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
