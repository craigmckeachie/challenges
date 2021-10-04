import { useState } from 'react';
import ItemForm from './ItemForm';

function ItemsList(props) {
  const { items, onRemove, onUpdate, loading, error } = props;
  const [editingItem, setEditingItem] = useState(null);

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            {item === editingItem ? (
              <ItemForm
                item={item}
                onSubmit={onUpdate}
                onCancel={handleCancel}
              />
            ) : (
              <p>
                <span>{item.name}</span>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => onRemove(item)}>Remove</button>
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default ItemsList;
