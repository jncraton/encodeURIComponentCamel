const sample =
  'HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes, and other items.\n\nDeCSS is one of the first free computer programs capable of decrypting commercially produced DVD-Video discs. Before the release of DeCSS, free and open source operating systems (such as BSD and Linux) could not play encrypted video DVDs.'

function swapCamel(text) {
  // Swaps space separated words to camel case and vice versa
  text = text.replace(/[,\.a-zA-Z] ?[a-zA-Z](?=[a-z])/g, match => {
    if (match.match(/[a-z] [a-z]/)) {
      // Spaced to camel
      return match[0] + match[2].toUpperCase()
    } else if (match.match(/[a-z][A-Z]/)) {
      // Camel to spaced
      return match[0] + ' ' + match[1].toLowerCase()
    } else if (match.match(/[,\.] [A-Za-z]/)) {
      // Remove space after punc
      return match[0] + match[2]
    } else if (match.match(/[,\.][A-Za-z]/)) {
      // Add space after punc
      return match[0] + ' ' + match[1]
    } else {
      return match
    }
  })

  return text
}

const assert = (a, b) => console.assert(a == b, `${a} != ${b}`)

assert(swapCamel('camelCase'), 'camel case')
assert(swapCamel('camel case'), 'camelCase')
assert(swapCamel('camel, case'), 'camel,case')
assert(swapCamel('camel,case'), 'camel, case')
assert(swapCamel('Hello. World.'), 'Hello.World.')
assert(swapCamel('Hello.World.'), 'Hello. World.')
assert(swapCamel('camel CASE'), 'camel CASE')
assert(swapCamel(swapCamel(sample)), sample)

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

const rand = 'b*4PzNvM%[&P&O-4c!m mEHQS3$QWokhhQ013P.7}|!CMN s1;ugD=#GBI^,cOWCoV'
assert(decode(encode(rand)), rand)
assert(decode(encode(sample)), sample)
console.log(sample.length, encode(sample).length, encode(sample))
