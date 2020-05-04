---
title: 'react-tater'
description: 'A React plugin to add emoji markers and annotations to any element on a page. With algorithms for collision detection and finding nearest points.'
featuredImage: images/react-tater-screenshot.png
thumbnail: images/thumbs/react-tater.png
date: '2020-05-03'
layout: project
category: 'Open Source'
technologies:
  ['JavaScript', 'React', 'React Hooks', 'Jest', 'create-react-library', 'styled-components', 'Unicode Emoji', 'Collision Detection']
links:
  - title: Live Demo
    url: https://iamlocaljo.com/react-tater-demo/
    color: 'green'
  - title: NPM Package
    url: https://www.npmjs.com/package/react-tater
    color: 'red'
---

## Project History

This project started as my submission to a [coding challenge](https://github.com/graphy-engineering/graphy-react-challenge). The challenge was to add the ability to add annotations to a demo React app. I decided to create a solution as a reusable React module that could be installed in any React project, and when I [published my solution on GitHub](https://github.com/localjo/react-tater), it got over 200 stars overnight, so I decided to maintain it as an open source project.

I named the library "Tater" as a fun play on the words "annotator" and "potato". I had a lot of fun adding potatoes to web pages while testing it. 🥔 There is [a live demo of this library with an interactive tour](https://iamlocaljo.com/react-tater-demo/) where you can add potatoes to the page or take a tour that explains how Tater works.

## Technical Details

I made a number of technical choices while building this library that are worth explaining:

1. **Standalone React Library**

   Annotations are a good candidate for abstraction because the functionality
   isn't dependent on the app it's a part of, so I decided to abstract my
   solution into [it's own library](https://github.com/localjo/react-tater/)
   that can be reused easily to add annotation functionality to any app.

2. **Grid and Collision Detection**

   My solution for handling markers that overlap was to make sure that they're
   not overlapping in the first place. I did this by implementing [a collision detection algorithm](https://github.com/localjo/react-tater/blob/master/src/position.js#L1-L9)
   and [a placement algorithm](https://github.com/localjo/react-tater/blob/master/src/position.js#L92-L111)
   that [uses the Pythagorean Theorem](https://github.com/localjo/react-tater/blob/master/src/position.js#L34)
   to reposition markers that collide into the nearest open space on a dynamic
   grid. The grid is invisible but [can be enabled in development](https://github.com/localjo/react-tater/blob/master/src/index.js#L38)
   to debug the implementation:

   ![Grid Placement Algorithm](./dynamic-placement-grid.png)

3. **Using Emoji for Markers**

   I chose to use emoji for the markers because they're familiar, fun and
   friendly. Browser support for emoji has improved and most modern browsers on
   macOS, Windows, Android and iOS support them, but getting the implementation
   right was a challenge. I thought I could just type the emoji characters
   directly in my code, but Babel didn't like that and threw errors in many
   cases:

   ![Babel Emoji Syntax Error](./babel-potato-error.png)

   My solution was to store [emoji as an array of Unicode Code Points](https://github.com/localjo/react-tater/blob/master/src/emojis.js#L60)
   and [decode them for display](https://github.com/localjo/react-tater/blob/master/src/marker.js#L260).
   But that wasn't the complete solution, because I also ran into [problems with Firefox not displaying Keycap Digit emoji correctly](https://bugzilla.mozilla.org/show_bug.cgi?id=1608548).
   To solve that, I used CSS to [manually set an emoji font](https://github.com/localjo/react-tater/blob/master/src/marker.js#L20)
   for the markers. This solution may need more testing on different browsers
   and operating systems.

4. **Demo App Dependencies**

   Most of my focus was on building the Tater library. In this repo my goal was
   just to set up a nice looking page to demonstrate the library. I used [`material-ui`](https://material-ui.com/)
   to set up some quick demo components without wasting too much time on them.
   I don't consider this as a dependency of my solution, since my library works
   in any React app regardless of what UI library it might use. Tater itself
   doesn't use any `material-ui` components.

5. **Unit Tests**

   I wrote some [unit tests for the positioning functions](https://github.com/localjo/react-tater/blob/master/src/position.test.js)
   in my library. This made it much easier to reason about the code for those
   functions since I could run the tests in watch mode while developing to
   check my logic. Running the tests in watch mode also gave me confidence
   that I wasn't breaking the underlying positioning functionality while
   making other changes to the library or refactoring code.

## Trade-offs and things left out

1. **Responsive Layout and Percentage Coordinates**

   Early on in developing my solution, I decided that I wanted annotations to
   work even if the annotated element's size changed. This has the advantage of
   working with responsive layouts. To achieve this, I decided to use percentage
   values to store the `x` and `y` coordinates instead of pixel values. The
   trade-off is a little bit of loss of precision and while it works well for
   simple rectangles, it doesn't work quite as well with elements that don't
   scale linearly or have children with changing ratios, as markers sometimes
   end up placed differently than a user might expect.

2. **Browser/OS Compatibility**

   Given the amount of time and resources I dedicated to this, the number of
   browsers I was able to test in is somewhat limited. I tested on macOS
   Catalina and Windows 10 in the latest versions of Firefox and Chrome. More
   extensive testing could be done using BrowserStack to test different browsers
   and operating systems. While I considered responsive layouts, I didn't test
   this on mobile devices so its mobile functionality might be limited.

3. **Dependencies and File Size**

   While I tried not to use unneeded dependencies, I didn't measure my build's
   file size. Towards the end of the project, when publishing it, I noticed a
   warning about the demo app's bundle size of 275KiB exceeding the recommended
   limit of 244KiB. While a lot of that file size comes from `material-ui` and
   not from my solution, it would be good to consider the impacts of file size
   on performance especially for a reusable library that might be installed
   in other apps.

## What I might change

If I were going to start over with this challenge, here's what I might do differently:

1. **Use a Flux Data Store**

   I originally built my solution without Redux or any other library for
   managing state. This was partly because I wanted to avoid adding
   dependencies, and partly because I didn't think the state I needed to manage
   would be very complex. But I ran into a problem when I tested my solution
   with a real user: tooltips in edit mode or the icon picker didn't close
   automatically when the user clicked outside of them, leading to a mess of
   editing tooltips open at the same time if the user wasn't careful.

   Making the tooltips close when a user clicked outside of them proved to be a
   challenge since each marker component manages it's own state, and doesn't
   receive events that happen in siblings and parents. The first solution I
   thought of was to make each tooltip close whenever a `blur` event happened
   (the user clicked outside of the tooltip). I thought this would be
   a quick and easy solution, but then to make sure that the `blur` event
   happened, I had to add a [hidden textarea element](https://github.com/localjo/react-tater/blob/master/src/marker.js#L263)
   inside each tooltip, [some timeouts](https://github.com/localjo/react-tater/blob/master/src/marker.js#L184-L205)
   to make sure that clicks still got handled correctly and [a state management trick](https://github.com/localjo/react-tater/blob/master/src/marker.js#L107-L114)
   to handle blur events.

   A better solution would have been to hoist the state management for the
   tooltips to the parent and consider using [a Flux pattern](https://facebook.github.io/flux/)
   and maybe a library like Redux to manage the state of the entire annotator.
   A Flux pattern also would have helped me create a consistent internal API
   for changing markers' emoji, text, position and pin state instead of writing
   a different updater function for each of those changes.

2. **Remove `styled-components`**

   I started my solution using `styled-components` since it was contained in
   the starter repo for the coding challenge. In the end, since there weren't many components
   to be styled, I could have done the styling using React inline`style`
   attributes to avoid the extra dependency. The advantage would be that my
   solution wouldn't have any dependencies then, and would be more lightweight.
   The downside would be slightly more complex syntax and more work to support
   cross-browser CSS, but the performance benefits might be worth it.

3. **Better Emoji Selection**

   The [emoji picker I built](https://github.com/localjo/react-tater/blob/master/src/marker.js#L248-L274)
   only allows for a selection from a limited set of emoji that I manually
   added. In the future, I could develop a full-featured emoji picker that uses
   Unicode ranges to allow picking from all possible emoji and quickly
   searching for emoji based on name.

4. **Improved Support for Tours**

   I added a simple tour in the demo app, that shows the features of Tater
   itself. I think there is a lot of potential to expand that functionality
   and add support for building full-featured tours of an app. This could be
   done by adding event handlers to the markers that progress through the tour
   when users perform certain actions. For example, opening the next tooltip in
   a tour with something like; `onTooltipSave: ()=>openTooltip(tooltipId)`.

5. **Fix Memory Leak**

   When removing a marker from the page, there is a warning in the browser
   console about removing a React element without cleaning up all of it's
   event listeners, which could lead to a memory leak over time if a user
   adds and removes a lot of annotations without refreshing the page. I didn't
   have time to investigate the cause of this yet.

6. **Add Test Coverage**

   I only added tests for the marker positioning functions, but there are more
   parts of the code that it would be worth adding tests to, specifically [the
   marker's state reducer](https://github.com/localjo/react-tater/blob/master/src/marker.js#L102-L138).

7. **Split Large Components into Smaller Parts**

   As my solution evolved, some components grew to be quite large. The code
   organization could be improved by splitting out different parts of existing
   components into their own components. For example, there are three
   `<Tooltip>` components inside the `<Mark>` component that could be split
   out into their own files. Abstracting some of the reused components would
   help make things more testable and easier to reason about.
