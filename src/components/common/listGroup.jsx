import React from "react";

const ListGroup = props => {
  const { items, onItemSelect, selectedItem, itemName, itemId } = props;
  return (
    <ul className="list-group mt-4">
      {items.map(item => (
        <li
          key={item[itemId]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem._id === item._id
              ? `list-group-item active`
              : `list-group-item`
          }
        >
          {item[itemName]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  itemName: "name",
  itemId: "_id",
};

export default ListGroup;
