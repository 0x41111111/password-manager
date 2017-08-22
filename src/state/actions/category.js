import v4 from 'uuid/v4';

import { categoryActions } from 'state/action-names';

/**
 * Creates or updates a category.
 * 
 * An object is needed with either one or two fields:
 * - id: needed if updating, the category ID to update. 
 *    If not supplied, one will be generated and a category created.
 * - name: needed if creating or updating, the name of the category.
 * 
 * @param {object} c The category to create or update.
 */
export function upsertCategory(c) {
  if (!c.id && !c.name) {
    throw new Error("New categories need an ID and name.");
  }

  if (!c.id && c.name) {
    c.id = v4();
  }

  return { type: categoryActions.upsert, category: c };
};

/**
 * Deletes a category.
 * @param {string} id The ID of the category to delete.
 */
export function deleteCategory(id) {
  if (!id) {
    throw new Error("An ID must be passed to delete a category.");
  }

  return { type: categoryActions.delete, id };
};
