
This is a lightweight template and boilerplate for a responsive single page app that uses both React and PostCSS.

It comes ready to go with base styling and example code.

## Bespoke implementations of this boilerplate.

If you are looking for a bespoke design and/or functionality drop me a line at [james@autotelic.io](mailto:james@autotelic.io).

## Running

Run development mode (local development server at localhost:8080)
```
npm run dev
```

Build for production
```
npm run build
```

## HTML

As the boilerplate is set up as a single page app there is only a single HTML template included - [main.ejs](/src/templates/main.ejs). Title, description, keywords etc are all controled via variables declared in [webpack.common.js](/webpack.common.js) through the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).

## React

The boilerplate uses React router to create a single page app at higher screen resolutions, and a flattened version at small resolutions. The core of this functionality lives in [ui.jsx](/src/js/components/ui.jsx). This is where routes and their accompanying content, transitions between routes, and layout based on screen size is defined.

CSS relating to React components is kept in a separate file alongside the JSX file it relates to. These CSS files should be completely modular, if it's JSX component is removed then the CSS should also be able to be deleted without affecting anything else in the site.

## CSS

CSS is transformed via **PostCSS** (https://github.com/postcss/postcss). You can find a list of plugins being used in [postcss.config.js](postcss.config.js).

**SMACSS** (https://smacss.com/) methodology is followed throughout the CSS, most notably in regards to managing specificity. A few rules from SMACSS I would suggest adhering to :

- Only classes and pseudo-classes are used as selectors (aside from a few exceptions such as [base.css](/src/css/content.css))
- Selector depth is restricted to a single level where ever possible. (aside from a few exceptions such as [content.css](/src/css/content.css))
- Keep your component CSS completely modular. Add layout specific styling from a layout file (see [ui.css](/src/js/components/ui.css)). This ensures that your components can easily be reused throughout your app.

These rules are not immutable, but adhering to them will make your life a lot easier. There are specific cases however where breaking them does make sense.

The pre-made styling uses the **BEM methodology** (http://getbem.com/) as it's naming convention. If you are looking for an alternative check out **SUIT** (https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). In my experience it is easier to maintain more consistent naming with BEM across teams, SUIT however has a smaller footprint in terms of HTML size.

### Important CSS files

- **[base.css](/src/css/base.css)** : Contains base styling for elements, as well as the reset file.
- **[config.css](/src/css/config.css)** : Is the single point of truth for all global css variables. I'd recommend limiting color declarations to this file, especially on larger projects.
- **[content.css](/src/css/content.css)** : Contains uniform styling for any copy (blog posts etc). One of the few places I define specificity above one level as I want these rules to be enforced consistently site-wide.
- **[critical.crit.css](/src/css/critical.crit.css)** : Critical styles that will be inlined into the sites head. Used for preloading fonts and avoiding flashes of unstyled content.
- **[type.css](/src/css/type.css)** : Base typography styling is declared here.

## Roadmap

- Auto-generation of CSS sprite map.
- Auto-generation of site map.
- Form components.
- Alert banner component.
- Pattern library implementation.

Placeholder logo icon : Penrose Triangle by Rflor from the Noun Project.
