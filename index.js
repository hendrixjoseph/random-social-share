'use strict'

const core = require('@actions/core')

const fetch = require('node-fetch')
const parse = require("csv-parse")

let tweet = content => {
  const consumer_key = `${ secrets.TWITTER_CONSUMER_KEY }`
  const consumer_secret = `${ secrets.TWITTER_CONSUMER_SECRET }`
  const access_token_key = `${ secrets.TWITTER_ACCESS_TOKEN }`
  const access_token_secret = `${ secrets.TWITTER_ACCESS_TOKEN_SECRET }`

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
        core.info(tweet)
    }).catch(error => {
        core.info(error)
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