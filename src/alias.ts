import path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '@src': __dirname,
  '@db': path.join(__dirname, 'db'),
  '@entities': path.join(__dirname, 'entities'),
  '@models': path.join(__dirname, 'models'),
  '@middlewares': path.join(__dirname, 'middlewares'),
  '@helpers': path.join(__dirname, 'helpers'),
  '@config': path.join(__dirname, 'config'),
  '@modules': path.join(__dirname, 'modules')
})
