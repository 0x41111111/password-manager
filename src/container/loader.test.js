import getContainer from './loader';

it('should fail with unknown or invalid provider names', () => {
  expect(() => getContainer({ provider: 'invalid' })).toThrow();
});

it('should require both a provider and ID to be present and not blank/undefined', () => {
  expect(() => getContainer({})).toThrow();

  expect(() => getContainer({ id: '' })).toThrow();
  expect(() => getContainer({ provider: '' })).toThrow();

  expect(() => getContainer({ id: undefined, provider: undefined })).toThrow();
  expect(() => getContainer({ id: '', provider: '' })).toThrow();
});
