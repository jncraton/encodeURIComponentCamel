const sample =
  'HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes, and other items.'

function swapCamel(text) {
  // Swaps space separated words to camel case and vice versa
  text = text.replace(/[,a-zA-Z] ?[a-zA-Z](?=[a-z])/g, (match) => {
    if (match.match(/[,a-z] [a-z]/)) {
      // Convert to camel
      return match[0] + match[2].toUpperCase()
    } else if (match[0].match(/[,a-z]/) && match[1].match(/[A-Z]/)) {
        // Convert to spaced
        return match[0] + ' ' + match[1].toLowerCase()
    } else {
      return match
    }
  })

  return text
}

console.assert(swapCamel('camelCase') == 'camel case')
console.assert(swapCamel('camel case') == 'camelCase')
console.assert(swapCamel('camel, case') == 'camel,Case')
console.assert(swapCamel('camel,Case') == 'camel, case')
console.assert(swapCamel('camel CASE') == 'camel CASE')
console.assert(swapCamel(swapCamel(sample)) == sample)

function encode(text) {
  text = swapCamel(text)

  text = encodeURIComponent(text)
  text = text.replace(/%20/g, '+')
  text = text.replace(/%2C/g, ',')

  return text
}

function decode(text) {
  text = text.replaceAll('+', ' ')
  text = decodeURIComponent(text)

  text = swapCamel(text)

  return text
}

console.assert(decode(encode(sample)) == sample)
console.log(sample.length, encode(sample).length)
