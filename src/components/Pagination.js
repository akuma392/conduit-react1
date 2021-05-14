function Pagination(props) {
  let { articlesCount, articlesPerPage, active } = props;

  let pagesArray = [];
  let numberOfPgaes = Math.ceil(articlesCount / articlesPerPage);

  for (let i = 1; i <= numberOfPgaes; i++) {
    pagesArray.push(i);
  }
  console.log(props.active);
  return (
    <div className="flex justify-center item-center pagination wrap">
      <div className="prev">
        <p
          onClick={() =>
            props.updateCurrentPage(active - 1 < 1 ? 1 : active - 1)
          }
        >
          Prev
        </p>
      </div>
      <div className="pagination-count">
        {pagesArray.map((page) => {
          return (
            <span
              key={page}
              onClick={() => props.updateCurrentPage(page)}
              className={props.active === page ? 'bg-green-700' : ''}
            >
              {page}
            </span>
          );
        })}
      </div>
      <div className="next">
        <p
          onClick={() =>
            props.updateCurrentPage(
              active + 1 > numberOfPgaes ? numberOfPgaes : active + 1
            )
          }
        >
          Next
        </p>
      </div>
    </div>
  );
}

export default Pagination;
