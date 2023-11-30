import PropTypes from 'prop-types';

function GameItems({
  items,
  type,
  divClass,
  itemClass,
  handleSelectItem,
  dropdownLeft,
  dropdownTop,
}) {
  return (
    <div
      id={type}
      className={type === 'items-to-find' ? divClass : null}
      style={type === 'dropdown' ? { left: dropdownLeft, top: dropdownTop } : null}
      tabIndex={0}
    >
      {items.map((item) => {
        return (
          <div
            key={item._id}
            className={itemClass}
            id={itemClass + item._id}
            onClick={type === 'dropdown' ? () => handleSelectItem(item) : null}
          >
            <img
              src={'https://wheres-waldo-api-production.up.railway.app/api/img/items/' + item._id}
              alt=""
              draggable={false}
            />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}

GameItems.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string,
  divClass: PropTypes.string,
  itemClass: PropTypes.string,
  handleSelectItem: PropTypes.func,
  dropdownLeft: PropTypes.string,
  dropdownTop: PropTypes.string,
};

export default GameItems;
