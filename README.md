# watchdog

[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/hackaburg/watchdog)](https://hub.docker.com/r/hackaburg/watchdog)
[![MicroBadger Size](https://img.shields.io/microbadger/image-size/hackaburg/watchdog)](https://hub.docker.com/r/hackaburg/watchdog)
[![MicroBadger Layers](https://img.shields.io/microbadger/layers/hackaburg/watchdog)](https://hub.docker.com/r/hackaburg/watchdog)

If run inside a docker-compose setup, the watchdog will notify the configured Slack channel about its shutdown.

## Usage

To get the watchdog, simply pull the `hackaburg/watchdog` image from the Docker hub and pass in your Slack webhook url as an environment variable:

```bash
$ docker run \
    --rm \
    -it \
    -e SLACK_WEBHOOK_URL=https://your-slack-webhook_url \
    hackaburg/watchdog
```

## License

This very basic watchdog script is released under the [MIT license](LICENSE).
