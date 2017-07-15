import { entries, categories } from './reducers';
import { upsertPasswordEntry, deletePasswordEntry } from 'state/actions/entry';
import { upsertCategory, deleteCategory } from 'state/actions/category';

const testEntryState = [
  { id: "abc", name: "account", login: "login" },
  { id: "def", name: "account2", login: "login2" },
  { id: "ghi", name: "account3", login: "login3" },
];

const testCategoryState = [
  { id: "a", name: "general" },
  { id: "b", name: "wifi" }
];

it('should update entries with IDs', () => {
  const result = entries(testEntryState,
    upsertPasswordEntry({ id: testEntryState[0].id, name: "account1", login: "login1" }));

  const modifiedEntry = result.find(v => v.id == testEntryState[0].id);

  expect(modifiedEntry.login).toBe("login1");
  expect(modifiedEntry.name).toBe("account1");
});

it('should create entries without IDs', () => {
  const result = entries(testEntryState,
    upsertPasswordEntry({ name: "account4", login: "login4" }));

  const newEntry = result.find(v => v.login == "login4");

  expect(newEntry.id).toBeTruthy();
});

it('should delete entries', () => {
  const result = entries(testEntryState, deletePasswordEntry(testEntryState[0].id));

  expect(result).not.toContain(testEntryState[0]);
});

it('should update categories with IDs', () => {
  const result = categories(testCategoryState,
    upsertCategory({ id: testCategoryState[0].id, name: "general1" }));

  const modifiedCategory = result.find(v => v.id == testCategoryState[0].id);

  expect(modifiedCategory.name).toBe("general1");
});

it('should create categories without IDs', () => {
  const result = categories(testCategoryState, upsertCategory({ name: "g2" }));

  const newCategory = result.find(v => v.name == "g2");
  expect(newCategory).toBeDefined();
});

it('should delete categories', () => {
  const result = categories(testCategoryState, deleteCategory(testCategoryState[1].id));
  expect(result).not.toContain(testCategoryState[1]);
});
