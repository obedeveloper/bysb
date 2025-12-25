# Bibiliya Yera

This repository provides the **Bibiliya Yera (BYSB)** version as a **Zefania XML file**.

It can work with software such as **FreeShow**, **OpenSong**, and **OpenLP**.

## API Endpoints

This repository also includes API endpoints returning responses in JSON format, making it easier to work with JavaScript. If you are using TypeScript, you can find types in the `/lib/types.ts` file.

**Base URL**: `https://bysb.obed2025.deno.net/` - This returns the whole Bible.

## Get Book

**URL**: `GET /{book-name}`  
**Description**: This endpoint returns the whole book.

**Example Request**: `GET /3 yohana`

**Example Response**:

```json
{
  "bnumber": "64",
  "bname": "3 Yohana",
  "CHAPTER": [
    {
      "cnumber": "1",
      "VERS": [
        {
          "content": "Jyewe Umukuru, ...",
          "vnumber": "1"
        }
      ]
    }
  ]
}
```

## Get Chapter

**URL**: `GET /{book-name}/{chapter-number}`  
**Description**: This endpoint returns the whole chapter.

**Example Request**: `GET /matayo/5`

**Example Response**:

```json
{
  "cnumber": "5",
  "VERS": [
    {
      "content": "Abonye abantu benshi ...",
      "vnumber": "1"
    }
  ]
}
```

## Get Verse

**URL**: `GET /{book-name}/{chapter-number}/{verse-number}`

**Example Request**: `GET /zaburi/150/4`

**Example Response**:

```json
{
  "content": "Muyishimishe ishako n'imbyino, ...",
  "vnumber": "4"
}
```

## ⚠️ Books with Only One Chapter

> [!NOTE]
> You might think that to get a chapter in a book with one chapter is like this: `GET /{book-name}/{chapter-number}`. However, these books do not have more than one chapter, so you can only get a verse instead of a chapter.

**Example Request**: `GET: /filemoni/5`

**Example Response**:

```json
{
  "content": "kuko numvise iby'urukundo rwawe ...",
  "vnumber": "5"
}
```

> [!WARNING]
> Don't try to do this `GET /{book-name}/1/{verse-number}`; you will receive an error.
