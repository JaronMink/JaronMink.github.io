---
title: People
permalink: /people/
layout: page
person_page: false
---

{% assign people_sorted = site.pages | where: 'person_page', true | sort: 'joined' %}
{% assign role_array = "pi|postdoc|phdstudent|mastersstudent|researchstaff|visiting|others|alumni" | split: "|" %}

<h3>Our Team</h3>
<div class="content list people">

{% for role in role_array %}
  {% if role != 'alumni' %}

    {% for profile in people_sorted %}
      {% if profile.position == role %}
        <div class="list-item-people">
          <p class="list-post-title">
            {% if profile.photo_ext %}
              <a href="{{ profile.url | relative_url }}">
                <img
                  class="profile-thumbnail"
                  src="{{ profile.url | append: 'profile.' | append: profile.photo_ext | relative_url }}"
                  alt="{{ profile.title }}"
                  width="200"
                  height="200"
                  loading="lazy"
                  decoding="async">
              </a>
            {% else %}
              <a href="{{ profile.url | relative_url }}">
                <img
                  class="profile-thumbnail"
                  src="{{ '/people/default/profile.jpg' | relative_url }}"
                  alt="{{ profile.title }}"
                  width="200"
                  height="200"
                  loading="lazy"
                  decoding="async">
              </a>
            {% endif %}
            <a class="name" href="{{ profile.url | relative_url }}">{{ profile.title }}</a>
            <br>
            {{ profile.position-text }}
          </p>
        </div>
      {% endif %}
    {% endfor %}

  {% else %}
</div>

<hr>
<h3>Alumni</h3>

<table class="alumni-table">
  <thead>
    <tr>
      <th>
        Alumni
		      </th>
      <th>
        Years Active (Position)
	      </th>
      <th>
        <div class="alumni-col-desc">Next position or affiliation</div>
      </th>
    </tr>
  </thead>
  <tbody>
      {% for profile in people_sorted %}
      {% if profile.position == "alumni" %}
        <tr>
          <td>
            <a class="name" href="{{ profile.url | relative_url }}">
              {{ profile.title }}
            </a>
          </td>
          <td>
            {{ profile.joined }}–{{ profile.left }} ({{ profile.position-text }})
          </td>
          <td>
            {{ profile['left-to'] }}
          </td>
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>

  {% endif %}
{% endfor %}
