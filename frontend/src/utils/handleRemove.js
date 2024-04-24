export const removeTag = (setChoseenTags, tagIdToRemove) => {
  console.log(tagIdToRemove);
  return setChoseenTags((prevTags) =>
    prevTags.filter((tag) => tag._id !== tagIdToRemove)
  );
};
