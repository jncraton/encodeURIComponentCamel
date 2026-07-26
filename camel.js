function swapCamel(text) {
  // Swaps space separated words to camel case and vice versa
  text = text.replace(/[,\.a-zA-Z] ?[a-zA-Z](?=[a-z])/g, match => {
    if (match.match(/[a-z] [a-z]/)) {
      // Spaced to camel
      return match[0] + match[2].toUpperCase()
    } else if (match.match(/[a-z][A-Z]/)) {
      // Camel to spaced
      return match[0] + ' ' + match[1].toLowerCase()
    } else {
      return match
    }
  })

  // Swaps spaces after punctuation
  text = text.replace(/[,/.] ?[a-zA-Z]/g, match => {
    if (match[1] == ' ') {
      return match[0] + match[2]
    } else {
      return match[0] + ' ' + match[1]
    }
  })

  return text
}

function encodeURIComponentCamel(text) {
  text = swapCamel(text)

  text = encodeURIComponent(text)
  text = text.replace(/%20/g, '+')
  text = text.replace(/%2C/g, ',')

  return text
}

function decodeCamel(text) {
  text = text.replaceAll('+', ' ')
  text = decodeURIComponent(text)

  text = swapCamel(text)

  return text
}
