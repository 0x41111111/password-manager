import { upsertPasswordEntry, deletePasswordEntry } from './entry';
import { entryActions } from 'state/action-names';

it('should generate an ID for the entry if no ID is passed', () => {
  let entry = {
    name: "Account X",
    login: "account@account.com"
  };

  const action = upsertPasswordEntry(entry);
  expect(action.type).toBe(entryActions.upsert);
});

it('should not tamper with entry IDs', () => {
  let entry = {
    name: "Account X",
    login: "account@account.com",
    id: "abc"
  };

  const action = upsertPasswordEntry(entry);
  expect(action.entry.id).toBe(entry.id);
});

it('should fail to emit an action without both a name and login when an ID is absent', () => {
  let entry = {
    name: "Account X",
  };
  expect(() => upsertPasswordEntry(entry)).toThrow();

  entry = { login: "a@a.com" };
  expect(() => upsertPasswordEntry(entry)).toThrow();
});

it('should emit a delete action given any valid ID', () => {
  expect(deletePasswordEntry("aaaaa")).toEqual({ type: entryActions.delete, id: "aaaaa" });

  expect(() => deletePasswordEntry(null)).toThrow();
  expect(() => deletePasswordEntry(undefined)).toThrow();
});
