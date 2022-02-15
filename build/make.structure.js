require('@tyler.thayn/js.core')
let Fs = require('fs'), Path = require('path')



try {Fs.mkdirSync(Path.resolve('./dist/scripts'))} catch (e) {}
try {Fs.mkdirSync(Path.resolve('./dist/styles'))} catch (e) {}
try {Fs.mkdirSync(Path.resolve('./dist/views'))} catch (e) {}

try {Fs.mkdirSync(Path.resolve('./dist'))} catch (e) {}
Fs.copyFileSync(Path.resolve('./src/manifest.json'), Path.resolve('./dist/manifest.json'))

try {Fs.mkdirSync(Path.resolve('./dist/images'))} catch (e) {}
Fs.copyFileSync(Path.resolve('./src/images/player.png'), Path.resolve('./dist/images/logo.png'))






