import PropTypes from 'prop-types';

function Dropdown({ items, handleSelectItem }) {
  return (
    <div id="dropdown">
      {items.map((item) => {
        return (
          <div
            className="dropdown-item"
            key={item.name}
            id={'dropdown-item' + item._id}
            onClick={() => handleSelectItem(item)}
          >
            <img src={'http://localhost:3000/api/img/items/' + item._id} alt="" draggable={false} />
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}

Dropdown.propTypes = {
  items: PropTypes.array,
  handleSelectItem: PropTypes.func,
};

export default Dropdown;
