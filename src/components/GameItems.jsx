import PropTypes from 'prop-types';

function GameItems({ items, type, itemClass, handleSelectItem, dropdownLeft, dropdownTop }) {
  return (
    <div id={type} style={type === 'dropdown' ? { left: dropdownLeft, top: dropdownTop } : null}>
      {items.map((item) => {
        return (
          <div
            key={item._id}
            className={itemClass}
            id={itemClass + item._id}
            onClick={type === 'dropdown' ? () => handleSelectItem(item) : null}
          >
            <img src={'http://localhost:3000/api/img/items/' + item._id} alt="" draggable={false} />
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
  itemClass: PropTypes.string,
  handleSelectItem: PropTypes.func,
  dropdownLeft: PropTypes.string,
  dropdownTop: PropTypes.string,
};

export default GameItems;
