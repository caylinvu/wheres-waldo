import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ScrollToTop({ prevPath, setPrevPath }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('leaderboard') && prevPath && prevPath.includes('leaderboard')) {
      setPrevPath(pathname);
      return;
    }
    setPrevPath(pathname);
    window.scrollTo(0, 0);
  }, [pathname, prevPath, setPrevPath]);

  return null;
}

ScrollToTop.propTypes = {
  prevPath: PropTypes.string,
  setPrevPath: PropTypes.func,
};

export default ScrollToTop;
