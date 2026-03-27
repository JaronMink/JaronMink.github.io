# The Happy Lab Website

This repo is organized so lab members can update the site without learning the site internals.

Most people only need these paths:

- `people/<your_slug>/` for your page and photos
- `_data/news.yml` for news
- `_data/publications.yml` for publications

You usually do **not** need to edit HTML, CSS, `_layouts/`, or `_includes/`.

## 1. Update Your Personal Page

Your folder should look like this:

```text
people/<your_slug>/
  index.md
  thumb.jpg
  profile.jpg
```

- `index.md`: your page text and profile details
- `thumb.jpg`: the smaller square image used on the people page
- `profile.jpg`: the medium square image used on your full profile page

If your image needs transparency, use `.png` instead of `.jpg`.

Use this template for `people/<your_slug>/index.md`:

```markdown
---
title: Jane Doe
position: phdstudent
position-text: PhD Student
joined: 2026
photo_ext: jpg
profile_lines:
  - PhD Student in Computer Science, Arizona State University
website_url: https://janedoe.example
website_label: Personal Website
email: jane.doe@asu.edu
office: |-
  BYENG 555
  Tempe, AZ 85281
---

Jane is interested in usable security, privacy, and how people make sense of AI-assisted systems.
```

- Everything in the `---` block is structured info.
- Everything below it is your bio in normal Markdown.
- The site automatically renders your photo, role line, website, email, and office.
- `title` is the name shown on the site
- `photo_ext` should match your image type, usually `jpg`
- The page automatically looks for `thumb.<photo_ext>` and `profile.<photo_ext>` in the same folder as `index.md`

- `position` should be one of `pi`, `postdoc`, `phdstudent`, `mastersstudent`, `researchstaff`, `visiting`, `others`, or `alumni`
- `position-text` is the label shown on the people page
- `profile_lines`, `website_url`, `website_label`, `email`, and `office` are optional
- If you do not have a field, just leave it out
- If the name on your page differs from the name used in publication author lists, add `author_name: ...`
- If you only want to update your bio, edit `index.md` and leave the image files alone

## 2. Add News

Edit `_data/news.yml`.

Add the newest item at the top.

Example:

```yaml
- date: 2026-03-27
  details: "Our paper <a href='https://example.com'><em>Example Title</em></a> was accepted to ExampleConf!"
```

- use `YYYY-MM-DD`
- quote `details` if it includes `:` or HTML
- inline links are fine

## 3. Add A Publication

Edit `_data/publications.yml`.

Example publication entry:

```yaml
- id: pub-example-2026
  year: 2026
  date: '2026-03-27'
  title: 'An Example Paper Title'
  authors:
    - Jane Doe
    - Jaron Mink
    - Pat Collaborator
  venue: Example Conference, 2026
  links:
    - label: PDF
      url: https://example.com/paper.pdf
      style: primary
```

- add newer publications near the top of `_data/publications.yml`
- authors can usually just be plain strings
- lab members are underlined automatically if the author name matches a current person page
- put URLs directly in the publication entry

Optional coverage links can go under `news:`

```yaml
news:
  - label: Coverage
    url: https://example.com/story
```

If you need a suffix or special styling, you can still use object form:

```yaml
authors:
  - name: Jane Doe
  - name: Pat Collaborator
    suffix: '*'
```

## Maintainer Notes

- Homepage content lives in `_data/homepage.yml`
- Shared templates live in `_layouts/` and `_includes/`
- Most students should not need to touch those files

## Preview Locally

If you want to preview the site locally:

```bash
sudo gem install jekyll
sudo gem install rouge
jekyll serve
```

Then open `http://localhost:4000`.
