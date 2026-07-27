const sample = `Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web content. It is often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.

Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web pagesemantically and originally included cues for its appearance.

HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes, and other items. HTML elements are delineated by tags, written using angle brackets. Tags such as <img> and <input> directly introduce content into the page. Other tags such as <p> and its corresponding closing tag </p> surround and provide information about document text and may include sub-element tags. Browsers do not display the HTML tags, but use them to interpret the content of the page.

HTML can embed programs written in a scripting language such as JavaScript, which affects the behavior and content of web pages. The inclusion of CSS defines the look and layout of content. The World Wide Web Consortium (W3C), former maintainer of the HTML and current maintainer of the CSS standards, has encouraged the use of CSS over explicit presentational HTML since 1997. A form of HTML, known as HTML5, is used to display video and audio, primarily using the <canvas> element, together with JavaScript.

DeCSS is one of the first free computer programs capable of decrypting commercially produced DVD-Video discs. Before the release of DeCSS, free and open source operating systems (such as BSD and Linux) could not play encrypted video DVDs.`

const assert = (a, b) => console.assert(a == b, `${a} != ${b}`)

assert(swapCamel('camelCase'), 'camel case')
assert(swapCamel('camel case'), 'camelCase')
assert(swapCamel('camel, case'), 'camel,case')
assert(swapCamel('camel,case'), 'camel, case')
assert(swapCamel('Hello. World.'), 'Hello.World.')
assert(swapCamel('Hello.World.'), 'Hello. World.')
assert(swapCamel('camel CASE'), 'camel CASE')
assert(swapCamel('McCoy'), 'Mc coy')
assert(swapCamel('Mc coy'), 'McCoy')
assert(swapCamel(swapCamel(sample)), sample)

const rand = 'b*4PzNvM%[&P&O-4c!m mEHQS3$QWokhhQ013P.7}|!CMN s1;ugD=#GBI^,cOWCoV'
assert(decodeURIComponentCamel(encodeURIComponentCamel(rand)), rand)
assert(decodeURIComponentCamel(encodeURIComponentCamel(sample)), sample)

async function encodeDeflate(text) {
  let stream = new Blob([text]).stream()

  stream = stream.pipeThrough(new CompressionStream('deflate-raw'))

  const res = await new Response(stream)
  const blob = await res.blob()
  const buffer = await blob.arrayBuffer()

  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
}

async function decodeDeflate(text) {
  const binary = Uint8Array.from(atob(text), c => c.charCodeAt(0))

  let stream = new Blob([binary]).stream()

  stream = stream.pipeThrough(new DecompressionStream('deflate-raw'))

  const res = await new Response(stream)
  const blob = await res.blob()
  return await blob.text()
}

function recase(text) {
  text = text.replace(/[\.\!\?] [A-Z]|[\.\!\?][a-z]/g, match => {
    if (match[1] == " ") {
      return match[0] + match[2].toLowerCase()
    } else {
      return match[0] + " " + match[1].toUpperCase()
    }
  })
  return text
}

assert(recase(recase(sample)), sample)

async function testDeflate() {
  const deflate = await encodeDeflate(sample)
  const deflateLower = await encodeDeflate(sample.toLowerCase())
  const deflateCamel = await encodeDeflate(swapCamel(sample))
  const deflateRecase = await encodeDeflate(recase(sample))
  const roundtripDeflate = await decodeDeflate(deflate)

  assert(roundtripDeflate, sample)

  console.log('original:', sample.length)
  console.log('encodeURIComponent:', encodeURIComponent(sample).length)
  console.log('encodeURIComponentCamel:', encodeURIComponentCamel(sample).length)
  console.log('deflate:', deflate.length)
  console.log('lowercased deflate', deflateLower.length)
  console.log('camel deflate', deflateCamel.length)
  console.log('recased deflate', deflateRecase.length)
  console.log('')
  console.log(swapCamel(sample))
}

testDeflate()
