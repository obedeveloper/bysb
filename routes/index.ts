import { Hono } from 'hono';
import bible from '../lib/bible.ts';
import { compareBookNames } from '../lib/utils.ts';
import { HTTPException } from 'hono/http-exception';

export const index = new Hono();

index.get('/:book?/:chapter?/:verse?', (c) => {
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

  const chapterContent = bookContent?.CHAPTER.find(
    (c) => c.cnumber == chapter!
  );
  if (!verse && chapterContent) {
    return c.json(chapterContent);
  }

  if (isNaN(Number(verse))) {
    throw new HTTPException(400, { message: 'Bad Request!' });
  }

  const verseContent = chapterContent?.VERS.find((v) => v.vnumber == verse);
  if (verseContent) {
    return c.json(verseContent);
  }

  throw new HTTPException(400, { message: 'Bad Request!' });
});
