import { useState } from 'react';
import { ID } from './itemAPI';

function ItemForm({ item, onSubmit, onCancel, buttonValue }) {
  const [inputValue, setInputValue] = useState(item.name || '');

  const handleChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const submittedItem = {
      id: item ? item.id : ID(),
      name: inputValue,
    };

    onSubmit(submittedItem);
    setInputValue('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input value={inputValue} onChange={handleChange} />
      <button>{buttonValue || 'Save'}</button>
      {onCancel && (
        <a href="#" onClick={handleCancel}>
          cancel
        </a>
      )}
    </form>
  );
}

export default ItemForm;
