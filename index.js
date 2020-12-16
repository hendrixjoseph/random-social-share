'use strict'

const core = require('@actions/core')

const fetch = require('node-fetch')
const parse = require("csv-parse")

let tweet = content => {
  const consumer_key = core.getInput('twitter_consumer_key')
  const consumer_secret = core.getInput('twitter_consumer_secret')
  const access_token_key = core.getInput('twitter_access_token')
  const access_token_secret = core.getInput('twitter_access_token_secret')

  core.setSecret(consumer_key);
  core.setSecret(consumer_secret);
  core.setSecret(access_token_key);
  core.setSecret(access_token_secret);
    
  let Twitter = require('twitter')
  
  let client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    access_token_key: access_token_key,
    access_token_secret: access_token_secret
  })
  
  client.post('statuses/update', {status: content})
    .then(tweet => {
        
        core.info(`Tweet available at https://twitter.com/${tweet.user.screen_name}/status/${tweet.id}`)
        core.info(`2Tweet available at ${tweet.entities.urls.expanded_url}`)
        core.info(`Full response:`
        core.info(`JSON.stringify(tweet))
    }).catch(error => {
        core.info(JSON.stringify(error))
    })
}

const source = core.getInput('source')

fetch(source)
    .then(res => res.text())
    .then(text => parse(text, {columns: true, escape: '\\'}, (err, posts) => {
        let index = Math.floor(Math.random() * posts.length)
        let post = posts[index]
        let content = `Classic post from ${post.date}: ${post.title} ${post.url}`
        
        tweet(content)
    }))