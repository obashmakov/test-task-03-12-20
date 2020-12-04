import { request } from './helpers';

export const getPhotos = async() => {
  const photos = await request('/images/');

  return photos;
};

export const getBigPhoto = async(id) => {
  const photo = await request(`/images/${id}/`);

  return photo;
};
