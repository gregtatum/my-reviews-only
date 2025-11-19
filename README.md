# My Reviews CLI

A small Node.js tool that prints your current review queue from GitHub and Phabricator so you can keep up with incoming requests from the terminal.

## Installation

Phabricator support requires `arc` on your PATH: https://we.phorge.it/book/phorge/article/installation_guide/

Install from npm to get the CLI on your PATH:

```sh
npm install -g my-reviews
```

Or run it ad-hoc with `npx`:

```sh
npx my-reviews github mozilla translations nordzilla
```

## Usage

The CLI exposes two subcommands, `phabricator` and `github`.

### Phabricator reviews

```sh
my-reviews phabricator <path-to-gecko-repo> <phabricator-user-phid>
```

- The first argument must be the Firefox checkout.
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

## Development

- `npm run typecheck` runs TypeScript against the JSDoc annotations (`phab.js`, `github.js`, and the CLI) to ensure structural typing stays sound.

## Publishing

To publish a new version to npm, login to npm via `npm login` then helper script from the repo root:

```sh
./publish.sh [patch|minor|major]
```
