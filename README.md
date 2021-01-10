# Initial Webpack 5 config for web projects

## List of features

* live server
* Pug -> HTML
* SCSS -> CSS (+ autoprefixer etc)
* ES6+ support via Babel
* Typescript support
* moving assets
* building SVG sprites (2 versions)
* airbnb linter (both - for JS and TS);

## How to use

### Run

To run build use:
```
npm start
```

To run in a prod mode use:
```
npm run build
```

### CSS/Imgs/Other assets

You don't need to include any css files/images/assets into your js files. Styles and images are fully separate here from js code and you can simply use then as if there is no webpack (with all the webpack support though).

### Sprites

If you use an svg icon with multiple colors, place it to a `src/assets/icons-colored` folder.

If you use an svg icon with a single color (and plan to use `fill` on it in css later), place it to a `src/assets/icons-solid` folder.

Then use your icons in html code like that:

```
<svg>
  <use xlink:href="./assets/sprites/sprites-solid/sprites.svg#icon-file-name">
  </use>
</svg>
```

