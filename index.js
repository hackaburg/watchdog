#!/usr/bin/env node

const slack = require("@slack/client");

const token = process.env.API_TOKEN;
const channel = process.env.CHANNEL;
const icon_url = process.env.ICON_URL;

const client = new slack.WebClient(token);

function notify(message) {
  return new Promise((resolve, reject) => {
    client.chat.postMessage(channel, message, {
      as_user: false,
      username: "watchdog",
      icon_url,
    }, (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

for (const signal of ["SIGTERM", "SIGINT", "SIGUSR1", "SIGUSR2"]) {
  process.on(signal, async () => {
    console.log(`received signal ${signal}`);
    await notify(`received signal ${signal}, about to shut down!`);
    process.exit();
  });
}

(async () => {
  await notify("watchdog started");
})();

function wake() {
  setTimeout(wake, 60 * 60 * 1000);
}

wake();
