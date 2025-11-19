#!/usr/bin/env node
// @ts-check
const { runPhabricatorReviews, runGithubReviews } = require('../index');

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command) {
    printUsage();
    process.exit(1);
  }

  try {
    switch (command) {
      case 'phabricator': {
        const [geckoDir, userId] = args;
        await runPhabricatorReviews(geckoDir, userId);
        break;
      }
      case 'github': {
        const [org, repo, user] = args;
        await runGithubReviews(org, repo, user);
        break;
      }
      default:
        console.error(`Unknown command: ${command}`);
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

function printUsage() {
  console.log(`Usage:\n  my-reviews phabricator <path-to-gecko> <phabricator-user-phid>\n  my-reviews github <org> <repo> <github-username>`);
}

main();
