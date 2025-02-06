
## For first deploy

- remove word_list imports
- remove/rename word/letter logic
- allow to control operators used under settings

- replace the favicons
- reenable the deploy workflow
- in the GitHub Pages settings, specify that GitHub Pages is built from GitHub Actions
- Add link etc to readme
- Add link to repo home
- what's new remove?
- update rules
- xlink between crossjig and this game

## `src/images`

- [ ] Add an svg favicon and reflect it in:
  - [ ] `index.html`
  - [ ] `manifest.json`
  - [ ] `webpack.config.js`
- [ ] Delete unneeded icons
- [ ] Add a maskable icon, screenshots, and PNG icons and reflect them in:
  - [ ] `index.html`
  - [ ] `manifest.json`
  - [ ] `webpack.config.js`

## PWA

- [ ] Use Lighthouse in Chrome developer tools to verify that the app is installable and meets PWA requirements.

## Google Analytics

- [ ] See https://github.com/skedwards88/react-base?tab=readme-ov-file#google-analytics
- [ ] Update the `G_TODO` id in `index.html`

## Set up hook to prevent pushing to main without passing linters

- [ ] `npx husky init`
- [ ] Add a pre-push hook (can copy from https://github.com/skedwards88/deep-space-slime/blob/main/.husky/pre-push)
