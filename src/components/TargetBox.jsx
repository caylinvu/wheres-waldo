import PropTypes from 'prop-types';

function TargetBox({ hideTargetBox }) {
  return (
    <div onClick={hideTargetBox} id="target-box">
      •
    </div>
  );
}

TargetBox.propTypes = {
  hideTargetBox: PropTypes.func,
};

export default TargetBox;
