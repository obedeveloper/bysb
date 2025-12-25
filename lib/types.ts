export interface Bible {
  biblename: string;
  BIBLEBOOK: Book[];
}

export interface Book {
  bnumber: string;
  bname: string;
  CHAPTER: Chapter[];
}

interface Chapter {
  cnumber: string;
  VERS: Verse[];
}

interface Verse {
  vnumber: string;
  content: string;
}
