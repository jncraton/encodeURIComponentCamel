function swapCamel(text) {
  // Swaps space separated words to camel case and vice versa
  text = text.replace(/([,a-z])( [a-z]|[A-Z])(?=[a-z])/g, (match, before, char) => {
    if (char[0] == ' ') {
      // Convert to camel
      return before + char[1].toUpperCase()
    } else {
      // Convert to spaced
      return before + ' ' + char.toLowerCase()
    }
  })

  return text
}

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