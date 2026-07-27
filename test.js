const sample =
  'HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects such as interactive forms may be embedded into the rendered page. HTML provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes, and other items.\n\nDeCSS is one of the first free computer programs capable of decrypting commercially produced DVD-Video discs. Before the release of DeCSS, free and open source operating systems (such as BSD and Linux) could not play encrypted video DVDs.'

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

async function testDeflate() {
  const deflate = await encodeDeflate(sample)
  const deflateLower = await encodeDeflate(sample.toLowerCase())
  const roundtripDeflate = await decodeDeflate(deflate)

  assert(roundtripDeflate, sample)

  console.log(
    'original:',
    sample.length,
    '\nencodeURIComponent:',
    encodeURIComponent(sample).length,
    '\nencodeURIComponentCamel:',
    encodeURIComponentCamel(sample).length,
    '\ndeflate:',
    deflate.length,
    '\nlowercased deflate',
    deflateLower.length,
    '\n\n',
    encodeURIComponentCamel(sample),
  )
}

testDeflate()
