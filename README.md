# Random Social Share

Randomly share a URL to Twitter & Facebook from a list of URLs in a CSV file.

CSV file must have headers. One column must be `title`, one must be `date`, and one must be `URL`.

## Options

| Option | Default Value | Description | Required |
|--------|--------|--------|--------|
| source | n/a | the url of the CSV file | true |
| twitter_access_token | n/a | the Twitter access token | true |
| twitter_access_token_secret | n/a | the Twitter access token secret| true |
| twitter_consumer_key | n/a | the Twitter consumer key | true |
| twitter_consumer_secret | n/a | the Twitter consumer secret | true |
| facebook_access_token | n/a | the Facebook access token | true |

## Sample workflow

```yml
name: Randomly share a blog post.
on:
  workflow_dispatch:
  schedule:
    - cron:  '0 14 * * *'

jobs:
  random-social-share:
    name: Randomly share a blog post.
    runs-on: ubuntu-latest
    steps:
      - uses: hendrixjoseph/random-social-share@master
        with:
          source: https://www.joehxblog.com/data/posts.csv
          twitter_access_token: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          twitter_access_token_secret: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
          twitter_consumer_key: ${{ secrets.TWITTER_CONSUMER_KEY }}
          twitter_consumer_secret: ${{ secrets.TWITTER_CONSUMER_SECRET }}
          facebook_access_token: ${{ secrets.FACEBOOK_ACCESS_TOKEN }}
```

The above workflow is the one I use for may main blog; it can be viewed at <https://github.com/hendrixjoseph/hendrixjoseph.github.io/blob/master/.github/workflows/random-social-share.yml>.
