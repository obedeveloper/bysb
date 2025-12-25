import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import bible from './lib/bible.ts';
import { compareBookNames } from './lib/utils.ts';

const app = new Hono();
app.get('/', (c) => c.json(bible));

app.get('/:book', (c) => {
  const { book } = c.req.param();
  const bookContent = bible.find(compareBookNames(book));

  if (!bookContent) {
    throw new HTTPException(404, {
      message: 'Igitabo uri gushaka ntabwo kibonetse!',
    });
  }

  return c.json(bookContent);
});

app.get('/:book/:chapter', (c) => {
  const { book, chapter } = c.req.param();
  const bookIndex = bible.findIndex(compareBookNames(book));

  const chapterContent = bible[bookIndex]?.CHAPTER[+chapter - 1];

  if (!chapterContent) {
    throw new HTTPException(404, {
      message: 'Igice uri gushaka ntabwo kibonetse!',
    });
  }

  return c.json(chapterContent);
});

app.get('/:book/:chapter/:verse', (c) => {
  const { book, chapter, verse } = c.req.param();
  const bookIndex = bible.findIndex(compareBookNames(book));
  const verseContent =
    bible[bookIndex]?.CHAPTER[+chapter - 1]?.VERS[+verse - 1];

  if (!verseContent) {
    throw new HTTPException(404, {
      message: 'Umurongo uri gushaka ntabwo ubonetse!',
    });
  }

  return c.json(verseContent);
});

Deno.serve(app.fetch);
