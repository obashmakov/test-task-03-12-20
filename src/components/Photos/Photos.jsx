/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPhotos } from '../../api/photos';
import './Photos.scss';

export const Photos = ({ setIsModalActive, setImgId }) => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    getPhotos()
      .then((photo) => {
        setPhotos(photo);
      });
  }, [setPhotos]);

  const getImgInfo = (id) => {
    setIsModalActive(true);
    setImgId(id);
  };

  return (
    <section className="photos">
      <div className="photos__container">
        {!photos && (
          <div className="photos__error">
            Loading... Please wait or try to reload.
          </div>
        )}

        {photos && (
          <div className="photos__grid">
            {photos.map(photo => (
              <div key={photo.image_id} className="photo__card">
                <img
                  className="photos__photo"
                  src={photo.src}
                  alt="nature"
                  onClick={() => getImgInfo(photo.image_id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

Photos.propTypes = {
  setIsModalActive: PropTypes.func.isRequired,
  setImgId: PropTypes.func.isRequired,
};
