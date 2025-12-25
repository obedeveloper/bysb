import { Book } from "./types.ts";

export const compareBookNames = (bookParam: string) => (book: Book) => {
  const lowerBookName = book.bname.toLowerCase();
  const lowerBookParam = bookParam.toLowerCase();

  return lowerBookName === lowerBookParam;
};
