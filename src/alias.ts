import path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '@src': __dirname,
  '@database': path.join(__dirname, 'database'),
  '@entities': path.join(__dirname, 'entities'),
  '@models': path.join(__dirname, 'models'),
  '@middlewares': path.join(__dirname, 'middlewares'),
  '@helpers': path.join(__dirname, 'helpers'),
  '@config': path.join(__dirname, 'config'),
  '@modules': path.join(__dirname, 'modules')
})
