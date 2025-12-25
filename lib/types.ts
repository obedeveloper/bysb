export interface Bible {
  biblename: string;
  BIBLEBOOK: Book[];
}

export interface Book {
  bnumber: number;
  bname: string;
  CHAPTER: Chapter[];
}

interface Chapter {
  cnumber: number;
  VERS: Verse[];
}

interface Verse {
  vnumber: number;
  content: string;
}
