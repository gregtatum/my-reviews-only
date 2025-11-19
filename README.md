# My Reviews Only

This has been part of my personal productivity tools, and I use it to check my review queue. I want to clean it up so that more of my team can use it to check their reviews from the CLI across GitHub and Phabricator.

Current usage:

```sh
revs() {
  # List all current things in my review queue
  node ~/scripts/my-reviews/phab "$HOME/dev/firefox" 'PHID-USER-hch2p624jejt4kddoqow'
  # node ~/scripts/my-reviews/github 'unicode-org' 'icu4x' 'gregtatum'
  node ~/scripts/my-reviews/github 'firefox-devtools' 'profiler' 'gregtatum'
  # node ~/scripts/my-reviews/github 'firefox-devtools' 'profiler-server' 'gregtatum'
  # node ~/scripts/my-reviews/github 'mozilla' 'treeherder' 'gregtatum'
  node ~/scripts/my-reviews/github 'projectfluent' 'fluent.js' 'gregtatum'
  node ~/scripts/my-reviews/github 'projectfluent' 'fluent-rs' 'gregtatum'
  node ~/scripts/my-reviews/github 'mozilla' 'firefox-translations-training' 'gregtatum'
  node ~/scripts/my-reviews/github 'mozilla' 'firefox-translations-models' 'gregtatum'
}
```

This needs to be udpated to:

- [x] Create a proper npm package. (Renamed the package to `my-reviews` and split the scripts into exportable modules.)
- [x] Create a CLI that can call out to the appropriate scripts. (Added the `my-reviews` binary with `phabricator` and `github` subcommands.)

```sh
my-reviews phabricator $PATH_TO_FIREFOX $PHABRICATOR_USER_ID
my-reviews github $ORG $REPO $USERNAME
```

e.g.

```sh
phab_user='PHID-USER-hch2p624jejt4kddoqow'
my-reviews phabricator "$HOME/dev/firefox" "$phab_user"
my-reviews github firefox-devtools profiler gregtatum
```

Next this is using flow types, I need this to use JavaScript with TypeScript annotations.

- [ ] Create a tsconfig to add type checking and install TypeScript.
- [ ] Migrate flow types to JSDoc TypeScript - https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

Finally let's cleanup the README. Remove all of the plan above and write a user guide on how to use the project.
