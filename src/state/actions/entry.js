// Contains all Redux action creators related to manipulating password entries.
import v4 from 'uuid/v4';

import { entryActions } from 'state/action-names';

export function upsertPasswordEntry(entry) {
  if (!entry.id) {
    if (!entry.name || !entry.login) {
      throw new Error("New entries require a name and login");
    }

    entry.id = v4();
  }

  return { type: entryActions.upsert, entry }
}

export function deletePasswordEntry(id) {
  if (!id) {
    throw new Error("A valid ID must be passed when deleting entries.");
  }

  return { type: entryActions.delete, id };
}
