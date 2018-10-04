const fs = require('fs')

const dirname = './xdr/'
const filePaths = fs.readdirSync(dirname)

let resultJs = ''

filePaths.forEach(filePath => {
  filePath = dirname + filePath

  if (fs.statSync(filePath).isDirectory() ||
     !filePath.includes('xdr')) {
    return
  }

  const fileContent = read(filePath)
  const enums = prepareEnums(fileContent)

  resultJs += makeMd(enums)
})

write(`
/** @module xdr-generated**/
${resultJs}
`)

function read (filePath) {
  return fs
    .readFileSync(filePath)
    .toString('utf-8')
}

function write (file) {
  fs.writeFile("./docs/enums.js", file, err => console.error(err))
}

function prepareEnums (content) {
  const regex = new RegExp(/enum (\w+)\s*{([^}]+)}/gm)

  let enums = []
  let match

  while ((match = regex.exec(content)) !== null) {
    const name = match[1]
    const values = match[2]

    const items = values
        .split(/\n/)
        .filter(v => v !== '')
        .map(v => v.trim())
        .map(v => v.replace(/,/g, ''))
        .map(v => toObject(v))

    enums.push({
      name,
      items
    })
  }

  return enums
}

function toObject (str) {
  const [kv, comment] = str.split('\/\/')
  const [key, value] = kv.split('=').map(s => s.trim())

  return { key, value, comment }
}

function makeMd (enums) {
  return enums.reduce((md, e) => md + appendEnum(e), '')
}

function appendEnum (e) {
  const name = e.name
  const items = e.items

  const result = items.reduce((md, item) => md + appendItem(item), appendName(name))

  return `
    \r/**${result}\r**/\r const ${name} = {}
  `
}

function appendItem (item) {
  if (!item.value && !item.key && item.comment) {
     return appendComment(item.comment)
  } else if (item.value && item.key) {
     return appendKeyValue(item.key, item.value, item.comment)
  } else {
    return ''
  }
}

function appendName (name) {
  return `\r* @constant ${name}`
}

function appendComment (comment) {
  return `\r* ${comment}`
}

function appendKeyValue (key, value, comment) {
  return `\r* @property ${key} {number} ${value} ${comment ? ` - ${comment}` : ''}`
}
