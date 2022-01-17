import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination variant='danger'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;

// import React from 'react';
// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useLocation } from 'react-router-dom';

// const Paginate = ({ total, page }) => {
//   const location = useLocation();
//   const path = location.pathname;
//   const baseURL =
//     path.split('/page/')[0] === '/' ? '' : path.split('/page/')[0];

//   if (total <= 1) return null;
//   return (
//     <Pagination className='justify-content-center my-3'>
//       {[...Array(total).keys()].map((p) => (
//         <LinkContainer key={p} to={`${baseURL}/page/${p + 1}`}>
//           <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
//         </LinkContainer>
//       ))}
//     </Pagination>
//   );
// };

// export default Paginate;