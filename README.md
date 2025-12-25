# Bibiliya Yera

This repository provides the **Bibiliya Yera (BYSB)** as a **Zefania XML file**. It can be used with software such as **FreeShow**, **OpenSong**, and **OpenLP**. The API allows developers to interact with the Bible data programmatically and is structured for ease of use.

## API Overview

### Base URL

**Base URL**: `https://bysb.obed2025.deno.net/`

This returns the complete Bible in response to requests.

> [!NOTE]
> All book names and search queries are `case-insensitive`. For spaces in search queries or books (e.g., `1 Timoteyo`), replace spaces with `%20`.

## API Endpoints

### Get Book

**URL**: `GET /{book-name}`

**Description**: Returns the entire book specified by `{book-name}`.

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

### Get Chapter

**URL**: `GET /{book-name}/{chapter-number}`

**Description**: Returns the specified chapter from the book.

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

> [!NOTE]
> If the book has only one chapter, you must retrieve it by requesting a verse instead.

### Get Verse

**URL**: `GET /{book-name}/{chapter-number}/{verse-number}`

**Description**: Fetch a specific verse.

**Example Request**: `GET /zaburi/150/4`

**Example Response**:

```json
{
  "content": "Muyishimishe ishako n'imbyino, ...",
  "vnumber": "4"
}
```

### Books with Only One Chapter

For books that contain only a single chapter, you cannot retrieve chapters. Instead, use the verse endpoint.

**Example Request**: `GET /filemoni/5`

**Example Response**:

```json
{
  "content": "kuko numvise iby'urukundo rwawe ...",
  "vnumber": "5"
}
```

> [!WARNING]
> Requests like `GET /{book-name}/1/{verse-number}` will result in an error.

### Searching

**URL**: `GET /search/{query}`

**Description**: Returns all verses that contain any of the specified keywords, sorted by the number of keyword occurrences.

#### Parameters

| Query Parameter | Type           | Description                                                                |
| --------------- | -------------- | -------------------------------------------------------------------------- |
| `?exact`        | boolean        | All keywords must appear in the verse in the specified order.              |
| `?mix`          | boolean        | Combines exact and non-exact matches. Use a dash (`-`) for exact keywords. |
| `?book`         | BookName       | Limits search results to specified book(s).                                |
| `?testament`    | `old` or `new` | Limits search results to the Old or New Testament.                         |

**Example Request 1**: `GET /search/yesu kristo`

**Example Request 2**: `GET /search/yesu kristo?exact=true`

**Example Request 3**: `GET /search/yesu-kristo imana gaburiyeli?mix=true`

**Example Request 4**: `GET /search/yesu kristo?book=matayo`

**Example Request 5**: `GET /search/yesu kristo?book=matayo&book=abaroma`

**Example Request 6**: `GET /search/yesu kristo?exact=true&testament=old`

> [!WARNING]
> Do not use both `mix` and `exact` query parameters in a single request; this will result in an error.

**Example Response**:

```json
{
  "result": [["/Matayo/1/1", ["yesu", "kristo"]]],
  "count": "1279"
}
```
