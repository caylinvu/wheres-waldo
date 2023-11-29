import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ScrollToTop({}) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // setShowMenu(false);
  }, [pathname]);

  return null;
}

ScrollToTop.propTypes = {
  // setShowMenu: PropTypes.func,
};

export default ScrollToTop;
