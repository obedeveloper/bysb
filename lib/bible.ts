import { XMLParser } from 'fast-xml-parser';
import { Bible } from './types.ts';

const xmlText = await Deno.readTextFile('bysb.xml');
const parser = new XMLParser({
  ignoreAttributes: false,
  textNodeName: 'content',
  attributeNamePrefix: '',
});

export default (
  parser.parse(xmlText.replace(/\s+/g, ' ')) as { XMLBIBLE: Bible }
).XMLBIBLE.BIBLEBOOK.map((b) => {
  const chapter = b.CHAPTER;

  if (!Array.isArray(chapter)) {
    return {
      ...b,
      CHAPTER: [chapter],
    };
  }

  return b;
});
