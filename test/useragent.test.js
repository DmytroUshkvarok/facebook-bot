var test = require('tape')

var BBY = require('bestbuy')
var pkg = require('../node_modules/bestbuy/package.json')

var bby = BBY({ key: 'XXX' })

test('User-Agent matches package version', function (t) {
  t.equals(bby.options.headers['User-Agent'], 'bestbuy-sdk-js/' + pkg.version + ';nodejs')
  t.end()
})
