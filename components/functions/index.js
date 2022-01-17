export const imageSource = (user) => {
  if (user.image) {
    return user.image.url;
  } else {
    return "/image/banner.jpg";
  }
};
