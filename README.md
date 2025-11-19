# My Reviews CLI

A small Node.js tool that prints your current review queue from GitHub and Phabricator so you can keep up with incoming requests from the terminal.

## Installation

Install from npm to get the CLI on your PATH:

```sh
npm install -g @gregtatum/my-reviews
```

Or run it ad-hoc with `npx`:

```sh
npx @gregtatum/my-reviews github mozilla translations nordzilla
```

This project targets modern Node.js (v18+) and relies on:
- An environment with `arc` configured to talk to your Phabricator instance.
- GitHub credentials if you want to increase the API rate limit (set `GITHUB_TOKEN`).

## Usage

Once linked (or by running `node ./bin/my-reviews.js ...`), the CLI exposes two subcommands.

### Phabricator reviews

```sh
my-reviews phabricator <path-to-gecko-repo> <phabricator-user-phid>
```

- The first argument must be the Gecko checkout where Arcanist is configured.
- The second argument is your Phabricator user PHID (find it in any revision JSON dump or via the Phabricator UI).

Example:

```sh
phab_user='PHID-USER-hch2p624jejt4kddoqow'
my-reviews phabricator "$HOME/dev/firefox" "$phab_user"
```

### GitHub reviews

```sh
my-reviews github <org> <repo> <github-username>
```

The command fetches open pull requests for the given repository, printing:
- PRs where you are a requested reviewer and the review is still outstanding.
- Your own open PRs (excluding drafts and WIPs) so you can monitor their status.

Example:

```sh
my-reviews github firefox-devtools profiler gregtatum
```

### Running without linking

If you are working from a local clone (or don’t want a global install), either use `npx` or call the script directly:

```sh
npx @gregtatum/my-reviews github mozilla translations nordzilla
npx @gregtatum/my-reviews phabricator "$HOME/dev/firefox" PHID-USER-hch2p624jejt4kddoqow

# or, from a clone
node ./bin/my-reviews.js github mozilla translations nordzilla
node ./bin/my-reviews.js phabricator "$HOME/dev/firefox" PHID-USER-hch2p624jejt4kddoqow
```

## Development

- `npm run typecheck` runs TypeScript against the JSDoc annotations (`phab.js`, `github.js`, and the CLI) to ensure structural typing stays sound.
- `npm test` is currently a placeholder; feel free to add integration tests for the API wrappers.

Contributions are welcome to expand the CLI (e.g. supporting multiple GitHub repos per invocation or surfacing Phabricator reviewers).

## Publishing

To publish a new version to npm, run the helper script from the repo root:

```sh
./publish.sh [patch|minor|major]
```

It defaults to a patch bump. The script will:

- run `npm run typecheck`
- ensure the git working tree is clean
- bump the version via `npm version <type>` (which commits + tags)
- `npm publish --access public`
- `git push origin HEAD --follow-tags`

Make sure you are logged in (`npm login`) before running it.
