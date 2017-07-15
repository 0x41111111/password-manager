import v4 from 'uuid/v4';

import { categoryActions } from 'state/action-names';

export function upsertCategory(c) {
  if (!c.id && !c.name) {
    throw new Error("New categories need an ID and name.");
  }

  if (!c.id && c.name) {
    c.id = v4();
  }

  return { type: categoryActions.upsert, category: c };
};

export function deleteCategory(id) {
  if (!id) {
    throw new Error("An ID must be passed to delete a category.");
  }

  return { type: categoryActions.delete, id };
};
