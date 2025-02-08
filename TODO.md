
## For first deploy

- remove/rename word/letter logic
- allow to control operators and digits used under settings

- Add link etc to readme
- Add link to repo home
- what's new remove?
- update rules
- xlink between crossjig and this game
- remove construction notice from readme, rules, info

## `src/images`

- [ ] Delete unneeded icons
- [ ] Add a maskable icon, screenshots, and PNG icons and reflect them in:
  - [ ] `index.html`
  - [ ] `manifest.json`
  - [ ] `webpack.config.js`
- [ ] remove src/images/screenshots/temp-screenshot.png and update places that use it

## PWA

- [ ] Use Lighthouse in Chrome developer tools to verify that the app is installable and meets PWA requirements.

## Google Analytics

- [ ] See https://github.com/skedwards88/react-base?tab=readme-ov-file#google-analytics
- [ ] Update the `G_TODO` id in `index.html`

## Set up hook to prevent pushing to main without passing linters

- [ ] `npx husky init`
- [ ] Add a pre-push hook (can copy from https://github.com/skedwards88/deep-space-slime/blob/main/.husky/pre-push)
