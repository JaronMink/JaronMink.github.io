---
title: People
permalink: /people/
---

{% assign people_sorted = site.people | sort: 'joined' %}
{% assign role_array = "pi|postdoc|phdstudent|mastersstudent|researchstaff|visiting|others|alumni" | split: "|" %}

<h3>Our Team</h3>
<div class="content list people">

{% for role in role_array %}
  {% assign people_in_role = people_sorted | where: 'position', role %}

  {% if role != 'alumni' %}

    {% for profile in people_sorted %}
      {% if profile.position contains role %}
        <div class="list-item-people">
          <p class="list-post-title">
            {% if profile.avatar %}
              <a href="{{ site.baseurl }}{{ profile.url }}">
                <img class="profile-thumbnail" src="{{ site.baseurl }}/images/people/{{ profile.avatar }}">
              </a>
            {% else %}
              <a href="{{ site.baseurl }}{{ profile.url }}">
                <img class="profile-thumbnail" src="{{ site.baseurl }}/images/people/default.jpg">
              </a>
            {% endif %}
            <a class="name" href="{{ site.baseurl }}{{ profile.url }}">{{ profile.name }}</a>
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
            <a class="name" href="{{ site.baseurl }}{{ profile.url }}">
              {{ profile.name }}
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
