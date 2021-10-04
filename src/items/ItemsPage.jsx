import ItemForm from './ItemForm';
import ItemsList from './ItemsList';
import { useItems } from './ItemHooks';

function ItemsPage() {
  const { items, loading, error, addItem, updateItem, removeItem } = useItems();

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
