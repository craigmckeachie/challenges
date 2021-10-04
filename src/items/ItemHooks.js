import { useState, useEffect } from 'react';
import { itemAPI } from './itemAPI';

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    itemAPI
      .getAll(1)
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
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

  return { items, loading, error, addItem, removeItem, updateItem };
}
