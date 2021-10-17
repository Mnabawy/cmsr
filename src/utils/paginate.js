import _ from "lodash";

const Paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const pagenatedMovies = _(items).slice(startIndex).take(pageSize).value();
  return pagenatedMovies;
};

export default Paginate;
