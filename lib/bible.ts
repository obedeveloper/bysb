import { XMLParser } from "fast-xml-parser";
import { Bible } from "./types.ts";

const xmlText = await Deno.readTextFile("bysb.xml");
const parser = new XMLParser({
  ignoreAttributes: false,
  textNodeName: "content",
  attributeNamePrefix: "",
});

export default (parser.parse(xmlText) as { XMLBIBLE: Bible }).XMLBIBLE
  .BIBLEBOOK;
