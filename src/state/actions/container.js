import { containerActions } from 'state/action-names';

export default function load(entries, categories) {
  return {
    type: containerActions.loadFromStoredContainer,
    entries, categories
  }
}