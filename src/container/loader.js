
/**
 * Returns a test container with no encryption.
 * This is purely intended for demo mode only.
 */
function getDemoContainer() {
  const demo = {
    version: 0,
    encrypted: false,
    created: new Date(),
    updated: new Date(),
    contents: {
      entries: [
        { id: 'demo-1', login: 'myaccount@example.com', name: "Email", password: "password" }
      ],
      categories: [
        { id: 'category-demo-1', name: "General" }
      ]
    }
  };
  return demo;
};

/**
 * Loads a raw container from a given provider.
 * This is asynchronous due to network activity potentially being involved.
 * 
 * If this function is called with an invalid or blank ID/provider, an error will be thrown.
 * 
 * Errors may be thrown in the event that the container can't be loaded.
 * @param {object} info An object containing the provider name and ID/URL of the container to load.
 */
export async function getRawContainer(info) {
  if (!info.provider || !info.id) {
    throw new Error("A provider and ID must be specified.");
  }

  if (info.provider === '' || info.id === '') {
    throw new Error("A non-blank provider and ID must be specified.");
  }

  switch (info.provider) {
    case 'demo':
      console.log('demo mode -- using hardcoded decrypted container');
      return getDemoContainer();
    default:
      throw new Error("Unknown provider");
  }; // eslint-disable-line
};
