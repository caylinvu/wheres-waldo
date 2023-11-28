import PropTypes from 'prop-types';

function TargetBox({ hideTargetBox, targetBoxLeft, targetBoxTop }) {
  return (
    <div onClick={hideTargetBox} id="target-box" style={{ left: targetBoxLeft, top: targetBoxTop }}>
      •
    </div>
  );
}

TargetBox.propTypes = {
  hideTargetBox: PropTypes.func,
  targetBoxLeft: PropTypes.string,
  targetBoxTop: PropTypes.string,
};

export default TargetBox;
