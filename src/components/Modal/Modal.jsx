/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import { getBigPhoto } from '../../api/photos';
import { getComments, updateComments } from '../../api/comments';

export const Modal = ({ isModalActive, setIsModalActive, imgId }) => {
  const [bigPhoto, setBigPhoto] = useState('');
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!imgId) {
      return;
    }

    getBigPhoto(imgId)
      .then((photo) => {
        setBigPhoto(photo);
      });

    getComments(imgId)
      .then((comment) => {
        setComments(comment);
      });
  }, [imgId, setBigPhoto]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setUserName(value);
    } else if (name === 'comment') {
      setNewComment(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateComments(userName, newComment, imgId);
    setComments([...comments, {
      name: userName,
      description: newComment,
      image_id: imgId,
    }]);
    setUserName('');
    setNewComment('');
  };

  const handleClose = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <>
      {isModalActive && (
        <div className="modal">
          <div className="modal__container">
            <div className="modal__info">
              <img
                className="modal__photo"
                src={bigPhoto.src}
                alt="nature"
              />
              <form className="modal__form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                  <input
                    className="modal__input"
                    type="text"
                    id="name"
                    name="name"
                    value={userName}
                    placeholder="Ваше имя"
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="comment">
                  <input
                    className="modal__input"
                    type="text"
                    id="comment"
                    name="comment"
                    value={newComment}
                    placeholder="Ваш комметарий"
                    onChange={handleChange}
                  />
                </label>
                <button className="modal__button" type="submit">
                  Оставить комментарий
                </button>
              </form>
            </div>

            {comments && (
              <div className="modal__comments">
                {comments.map(comment => (
                  <div key={comment.id} className="modal__comment">
                    <p className="modal__name">
                      {comment.name}
                    </p>
                    <p className="modal__text">
                      {comment.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              className="modal__close"
              type="button"
              onClick={handleClose}
            >
              <div className="modal__line-right" />
              <div className="modal__line-left" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isModalActive: PropTypes.bool.isRequired,
  setIsModalActive: PropTypes.func.isRequired,
  imgId: PropTypes.number.isRequired,
};
