---
title: 'Quotable'
description: 'A library that adds buttons to quotes and text selection that make it quick and easy for people to share quotes from your website.'
featuredImage: images/quotable-banner.png
thumbnail: images/thumbs/wordpress-quotable.png
date: '2014-05-03'
layout: project
category: 'Open Source'
technologies: ['WordPress', 'PHP', 'TypeScript', 'JavaScript', 'ES6', 'ES5', 'Preact', 'CSS', 'HTML']
links:
  - title: WordPress.org
    url: https://wordpress.org/plugins/quotable/
    color: 'blue'
  - title: TypeScript Repo
    url: https://github.com/localjo/quotable-toolbar
    color: 'white'
  - title: WP Plugin Repo
    url: https://github.com/localjo/quotable-wp
    color: 'white'
---

## Project Description

Quotable is a library that makes it quick and easy for people to share quotes from your website with two simple features. The first feature is a Medium-like popup toolbar that appears when a person selects text on a website making it easy to share the selected text on social media. You can select some text on this page to see it in action. The second feature is social sharing buttons that added to the end of blockquotes and pullquotes on a web page. Here's what that looks like:

> Quotable helps your readers share inspiring quotes from your site and spark engaging dialogue.

If you want to use Quotable on your own website, check out the "Project links" section in this post.

## Project History

Back in 2014, Medium.com had become popular and had a great feature for sharing text selection via Twitter. I wanted to add that feature to my WordPress blog, so I decided to build this plugin for myself as a way to learn how to build WordPress plugins while improving my own website. When I released it, [I wrote a blog post about it](/blog/wordpress-quotable/), and a few hundred people downloaded it. It got all five star reviews. It was the first time that an open source project I had built got attention, and the positive feeling of doing something that other people found useful was one of the things that encouraged me to start contributing to open source projects.

> Everyone who does something well, started by doing it poorly.

The first version of the plugin was very simple. It was a single PHP file, with a little bit of HTML and CSS. But in 2020, much farther along in my software development career, I wanted to level up my WordPress plugin development skills, so I decided to rebuild version 2.0 of the plugin. I updated the plugin to bring it up to date with the latest technologies, improve the user experience, and make it more extensible so I can add features and make it available on other platforms.

## Technical Details

While the original version of Quotable was a simple PHP file, the latest version is built with a modular design, a standalone library (written in TypeScript and exported as an ES6 module and as an ES5 browser script) that can be used on any webpage, and a WordPress plugin that makes it easy to install and configure the library on a WordPress blog.

The TypeScript library has a single dependency, Preact, that's small file size (3kB) makes it a good solution for rendering JSX templates with a small footprint. While Preact's API is compatible with React, it didn't bundle well with other React components such as \`react-svg\`, and the bundle size increased significantly, so I included the SVG icons in the project as strings, instead of React components to keep the file size low.

The WordPress plugin installs the TypeScript library on a WordPress website, integrating seamlessly with Yoast's SEO plugin to add the website and author's social media information to shared quotes. The WordPress plugin provides an interface for configuring Quotable's settings in the WordPress dashboard, classic post editor and new Gutenberg blocks editor.

## Future Plans

Right now Quotable supports sharing quotes on Twitter, but I would like to add support for sharing quotes on LinkedIn, Facebook, Reddit, Hacker News, Email and others. I plan to add this support directly to the TypeScript library, and create a separate plugin that adds configuration for those networks to WordPress. Now that Quotable is modular, I would like to create plugins for other platforms like Squarespace, Wix, Joomla, Drupal, Ghost, Shopify and more. If you would like to request a custom integration of Quotable with your website, or platform, or you would like to make a feature request, [please become one of my Patrons](https://patreon.com/localjo) for access to exclusive support and updates.
