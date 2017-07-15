import { upsertCategory, deleteCategory } from './category';
import { categoryActions } from 'state/action-names';

it('should generate an ID for the category if no ID is passed', () => {
  let c = {
    name: "General",
  };

  const action = upsertCategory(c);
  expect(action.type).toBe(categoryActions.upsert);
  expect(action.category.id).toBeTruthy();
});

it('should not tamper with existing IDs', () => {
  let c = {
    name: "General",
    id: "abc"
  };

  const action = upsertCategory(c);
  expect(action.category.id).toBe(c.id);
});

it('should fail to emit an action without a name or valid object being passed', () => {
  let c = {};
  expect(() => upsertCategory(c)).toThrow();

  c = null;
  expect(() => upsertCategory(c)).toThrow();

  c = undefined;
  expect(() => upsertCategory(c)).toThrow();  
});

it('should emit a delete action given any valid ID', () => {
  expect(deleteCategory("aaaaa")).toEqual({ type: categoryActions.delete, id: "aaaaa" });

  expect(() => deleteCategory(null)).toThrow();
  expect(() => deleteCategory(undefined)).toThrow();
});
