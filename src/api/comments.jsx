/* eslint-disable camelcase */
import { request, post } from './helpers';

export const getComments = async(id) => {
  const comments = await request(`/comments/${id}/`);

  return comments;
};

export const updateComments = async(name, description, image_id) => post(
  '/comments/add/', {
    name,
    description,
    image_id,
  },
);
