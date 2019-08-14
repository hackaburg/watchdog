const { IncomingWebhook } = require("@slack/webhook");
const token = process.env.SLACK_WEBHOOK_URL;
const hook = new IncomingWebhook(token);

for (const signal of ["SIGTERM", "SIGINT", "SIGUSR1", "SIGUSR2"]) {
  process.on(signal, async () => {
    console.log(`received signal ${signal}`);

    await hook.send({
      text: `received signal ${signal}, about to shut down!`,
    });

    process.exit();
  });
}

hook.send({
  text: "watchdog started",
});

function wake() {
  setTimeout(wake, 60 * 60 * 1000);
}

wake();
