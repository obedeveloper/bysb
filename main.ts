import { Hono } from 'hono';
import { index } from './routes/index.ts';
import { search } from './routes/search.ts';

const app = new Hono();

app.route('/search', search);
app.route('/', index);

Deno.serve(app.fetch);
