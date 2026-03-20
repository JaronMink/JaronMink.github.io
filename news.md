---
title: News
permalink: /news/
---

<div class="news-archive">
  <h1 class="page-title">Happy Lab News</h1>
  <p class="news-archive-intro">
    Milestones, talks, collaborations, and updates from the lab.
  </p>

  <div class="news-archive-list">
    {% assign sorted_news = site.data.news | sort: "date" | reverse %}
    {% for news in sorted_news %}
      <article class="news-archive-item">
        <p class="news-archive-date">{{ news.date | date: "%B %-d, %Y" }}</p>
        <div class="news-archive-body">{{ news.details }}</div>
      </article>
    {% endfor %}
  </div>
</div>
