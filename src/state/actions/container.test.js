import load from './container';
import { containerActions } from 'state/action-names';

it('should produce an overwrite/load action', () => {
  const action = load({entries: [], categories: []});

  expect(action.type).toBe(containerActions.loadFromStoredContainer);
});