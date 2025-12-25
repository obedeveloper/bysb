import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import bible from '../lib/bible.ts';

export const search = new Hono();

search.get('/:query', (c) => {
  const query = c.req.param('query').toLowerCase();
  const exactMatch = c.req.query('exact');
  const mixMatch = c.req.query('mix');

  if (mixMatch && exactMatch) {
    throw new HTTPException(400, { message: 'Bad Request!' });
  }

  let chunks = exactMatch ? [query] : query.split(' ');
  const result = new Map<string, string[]>();

  if (mixMatch) {
    chunks = chunks.map((c) => c.replace('-', ' '));
  }

  bible.forEach((b) => {
    const { bname, CHAPTER } = b;

    CHAPTER.forEach((c) => {
      const { cnumber, VERS } = c;

      VERS.forEach((v) => {
        const { vnumber, content } = v;
        const link =
          CHAPTER.length > 1
            ? `/${bname}/${cnumber}/${vnumber}`
            : `/${bname}/${vnumber}`;

        chunks.forEach((c) => {
          if (content.toLowerCase().includes(c)) {
            result.set(link, [...(result.get(link) ?? []), c]);
          }
        });
      });
    });
  });

  const sortedResults = Array.from(result.entries()).sort(
    (a, b) => b[1].length - a[1].length
  );

  return c.json({ result: sortedResults, count: result.size });
});
