GitBook Plugin: Language Picker
===============================

## Usage

1. Update `plugins` in `book.json` file to include `language-picker` plugin.

```
{
    "plugins": [
        "language-picker"
    ]
}
```

2. Run `gitbook install` in console to install plugins.

3. You'll find "globe" icon in toolbar.

## How this works

Click that icon, dropdown menu will show you a grid with references to all languages that you set in root file `LANGS.md`.

Access to `../index.html` ("Select language" page) required, so don't try to retrieve languages *locally* yet.

After selecting language browser will be moved to translated version of current page.

## Configuration

You can set:
* Columns count of languages grid (`grid-columns`) - (default: `3`).

Add into `book.json`
```
    "pluginsConfig": {
        "language-picker": {
            "grid-columns": 3
        }
    }
```

## Why it's not using flags?

There is dialect and also country division. So I don't want to split languages on both; you can read [other good information about it](https://www.ethnologue.com/about/problem-language-identification) and think about that doing it or not yourself.