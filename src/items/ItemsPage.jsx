import { useState, useEffect } from 'react';
import ItemForm from './ItemForm';
import ItemsList from './ItemsList';
import { itemAPI } from './itemAPI';
import { loadItems } from './state/State';
import { useSelector, useDispatch } from 'react-redux';

function ItemsPage() {
  const loading = useSelector((state) => state.itemState.loading);
  const error = useSelector((state) => state.itemState.error);
  const items = useSelector((state) => state.itemState.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  const addItem = (item) => {
    itemAPI
      .add(item)
      .then((newItem) => {
        setItems([...items, newItem]);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const updateItem = (updatedItem) => {
    itemAPI
      .update(updatedItem)
      .then((data) => {
        let updatedItems = items.map((item) => {
          return item.id === updatedItem.id
            ? Object.assign({}, item, data)
            : item;
        });
        setItems(updatedItems);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const removeItem = (removeThisItem) => {
    itemAPI
      .delete(removeThisItem.id)
      .then(() => {
        const filteredItems = items.filter(
          (item) => item.id != removeThisItem.id
        );
        setItems(filteredItems);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <ItemForm item="" onSubmit={addItem} buttonValue="Add" />
      <ItemsList
        loading={loading}
        error={error}
        items={items}
        onRemove={removeItem}
        onUpdate={updateItem}
      />
    </div>
  );
}

export default ItemsPage;
