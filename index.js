const { IncomingWebhook } = require("@slack/webhook");
const discord = require("discord.js");

const slackToken = process.env.SLACK_WEBHOOK_URL;
const discordURL = process.env.DISCORD_WEBHOOK_URL;

const slackHook, discordHook;

if (slackToken) {
  slackHook = new IncomingWebhook(slackToken);
}

if (discordURL) {
  // Structure of discord webhook URL: https://discord.com/api/webhooks/[id]/[token]
  const discordCredentials = discordURL
    .replace("https://discord.com/api/webhooks/", "")
    .split("/");

  discordHook = new discord.WebhookClient(
    discordCredentials[0],
    discordCredentials[1]
  );
}

for (const signal of ["SIGTERM", "SIGINT", "SIGUSR1", "SIGUSR2"]) {
  process.on(signal, async () => {
    console.log(`received signal ${signal}`);

    if (slackToken) {
      await slackHook.send({
        text: `received signal ${signal}, about to shut down!`,
      });
    }

    if (discordID && discordToken) {
      discordHook.send(`received signal ${signal}, about to shut down!`);
    }

    process.exit();
  });
}

if (slackToken) {
  slackHook.send({
    text: "watchdog started",
  });
}

if (discordID && discordToken) {
  discordHook.send("watchdog started");
}

function wake() {
  setTimeout(wake, 60 * 60 * 1000);
}

wake();
