'use strict'
const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const path = require('path')

/* input and output paths */
const outputDir = './docs/markdown'
fs.mkdirSync(outputDir)

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({
  configure: './.jsdoc.json',
  files: '*',
  'no-cache': true
})

/* reduce templateData to an array of class names */
const classNames = templateData.reduce((classNames, identifier) => {
  if (identifier.kind === 'class') classNames.push(identifier.name)
  return classNames
}, [])

/* create a documentation file for each class */
for (const className of classNames) {
  const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`
  console.log(`rendering ${className}, template: ${template}`)
  const output = jsdoc2md.renderSync({
    data: templateData,
    template: template
  })
  fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output)
}

/**
 * copy readme
 */
const readme = fs.readFileSync('./docs/README.md')
  .toString('utf-8')
  .replace(/\.html/g, '.md')
console.log(readme)
fs.writeFileSync(path.resolve(outputDir, 'README.md'), readme)
