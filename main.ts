import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import bible from './lib/bible.ts';
import { compareBookNames } from './lib/utils.ts';

const app = new Hono();

app.get('/:book?/:chapter?/:verse?', (c) => {
  let { book, chapter, verse } = c.req.param();

  if (!verse && !chapter && !book) {
    return c.json(bible);
  }

  const bookContent = bible.find(compareBookNames(book!));
  if (!verse && !chapter && bookContent) {
    return c.json(bookContent);
  }

  const numberOfChapters = bookContent?.CHAPTER.length;
  if (numberOfChapters == 1 && verse) {
    throw new HTTPException(403, { message: 'Invalid Format!' });
  }

  if (numberOfChapters == 1) {
    [verse, chapter] = [chapter, '1'];
  }

  if (isNaN(Number(chapter))) {
    throw new HTTPException(400, { message: 'Bad Request!' });
  }

  const chapterContent = bookContent?.CHAPTER.at(+chapter! - 1);
  if (!verse && chapterContent) {
    return c.json(chapterContent);
  }

  if (isNaN(Number(verse))) {
    throw new HTTPException(400, { message: 'Bad Request!' });
  }

  const verseContent = chapterContent?.VERS.at(+verse! - 1);
  if (verseContent) {
    return c.json(verseContent);
  }

  throw new HTTPException(400, { message: 'Bad Request!' });
});

Deno.serve(app.fetch);
