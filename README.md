A React/Redux based password manager, designed to be an alternative to other password managers such as KeePass.

At present, it's still in very early stages and isn't ready for use yet.

# Progress

- [ ] Sidebar
  - [x] Entry creation
  - [x] Settings button
  - [ ] Lock/Exit
    - [ ] Halt navigation for unsaved changes
    - [x] Picker redirect
  - [x] Category creation
  - [ ] Category buttons
    - [x] Category list
    - [ ] Edit/Delete
    - [ ] Entry totals
- [x] Password Entry Cards
  - [x] Style/layout
  - [x] Edit/Delete
  - [x] Redux
  - [x] Reveal/Copy
    - [x] Feature detection: block copying on unsupported browsers (Safari)
- [ ] Confirmation Modals 
  - [x] Discard Changes
  - [x] Delete Entry
  - [ ] Delete Category
- [ ] Other Modals
  - [ ] Settings
    - [x] Development Tools
  - [ ] Password entry
    - [ ] Create/Edit
      - [x] Style/layout
      - [x] Redux
      - [ ] Category picker
      - [ ] Validation

# Setup Instructions

1. Create a Google APIs project and enable the Drive API.
1. Obtain an OAuth 2 web app token and configure it for `http://localhost:3000` as well as any other URLs you want to use.
1. Create `.env.development` with the following contents: `REACT_APP_DRIVE_API_CLIENT_ID=<token here with no brackets>`
1. `yarn install && yarn start`
1. (optional) open the URL obtained from `yarn start` on other devices you wish to test on.

---

This project uses [Create React App](https://github.com/facebookincubator/create-react-app).
