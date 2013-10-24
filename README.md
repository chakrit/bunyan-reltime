
# BUNYAN-RELTIME

A little utility for filtering [bunyan][1] logs using [reltime][0] notation.

Install with:

```sh
$ npm install -g bunyan-reltime
```

For example, to stream logs from your server starting from the last 5 days, do this:

```sh
ssh your.server.example.com sudo tail -f /app/bunyan.log | bunyan-reltime -5d | bunyan
```

To almost trim it down to the first 100 entries, combine it with the `head` command like
so:

```sh
ssh your.server.example.com sudo tail -f /app/bunyan.log | \
  bunyan-reltime -5d | \
  head -100 | \
  bunyan
```

See the [reltime module][0] README for more syntax information.

[0]: https://github.com/rsdoiel/reltime
[1]: https://github.com/trentm/node-bunyan
