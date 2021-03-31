const { Marp } = require('@marp-team/marp-core')
const container = require('markdown-it-container')

module.exports = (opts) => new Marp(opts).use(container, 'columns')
