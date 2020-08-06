const isMailValid = ({ data = void 0 }) => {
  if (!data) {
    return false;
  }
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return data.match(mailFormat);
};

export { isMailValid };
