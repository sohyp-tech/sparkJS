# Spark.JS

Spark.JS is a lightweight front-end JavaScript framework with no dependencies and no build tooling required. It is designed for simple, fast UI creation and takes inspiration from Flutter’s component-oriented and layout-driven structure.

## Project Description

Spark.JS helps you build web interfaces by creating DOM elements through small helper functions such as `el()`, `Container()`, `Row()`, `Column()`, `Text()`, `Button()`, and others. It works without installing packages, setting up bundlers, or writing a complex application scaffold.

The framework is intentionally minimal and focused on clarity, speed, and low setup overhead. Instead of a large ecosystem, Spark.JS gives you a small API for composing views, managing simple state, and handling basic routing.

## Features

- No external dependencies
- No build tools required
- Direct DOM element creation
- Flutter-inspired layout patterns
- Simple text state management with `textState()`
- Simple HTML/element state management with `elementsState()`
- Hash-based routing via `createSparkRouter()`
- Utility helpers like `getHTMLElement()` and `mount()`
- Suitable for small apps, prototypes, and lightweight UI experiments

## Quick Start

### 1) Include the script

```html
<script src="https://github.com/sohyp-tech/sparkJS/index.js"></script>
```

### 2) Create an app container

```html
<div id="app"></div>
```

### 3) Build UI elements

```javascript
const app = document.getElementById("app");

const title = Text({
  text: "Welcome to Spark.JS",
  style: "font-size: 24px; color: #222;"
});

const button = Button({
  text: "Click Me",
  onClick: () => {
    alert("Clicked!");
  },
  style: "padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px;"
});

app.appendChild(title);
app.appendChild(button);
```

### 4) Use layout helpers

```javascript
const layout = Column({
  style: "gap: 16px; min-height: 100vh;"
});

layout.appendChild(Text({ text: "Title" }));
layout.appendChild(Button({ text: "Action" }));

mount("#app", layout);
```

## Reactive State Management

Spark.JS provides two lightweight state helpers: `textState()` and `elementsState()`.

### textState()

Use this when you want to track a text value and automatically update a DOM element.

```javascript
const state = { msg: "Hello" };
const messageElement = Text({ text: state.msg });

const reactiveText = textState(state, "msg", state.msg, messageElement);

reactiveText.msg = "Text updated!";
```

When `state.msg` changes, the linked element's `textContent` is updated automatically.

### elementsState()

Use this when you want to track HTML content or a complex rendered block.

```javascript
const viewState = { html: "<b>Hello</b>" };
const container = Container({ style: "padding: 20px;" });

const reactiveHTML = elementsState(viewState, "html", viewState.html, container);

reactiveHTML.html = "<b>HTML updated</b>";
```

When `html` changes, the linked element’s `innerHTML` is updated automatically.

## Routing

Spark.JS includes a simple hash-based router using `createSparkRouter()`.

```javascript
const routes = {
  "/": () => {
    mount("[sk-body]", Text({ text: "Home Page" }));
  },
  "/about": () => {
    mount("[sk-body]", Text({ text: "About Page" }));
  },
  "/404": () => {
    mount("[sk-body]", Text({ text: "Page Not Found" }));
  }
};

createSparkRouter(routes);
```

Your app root should include the `sk-body` attribute:

```html
<div sk-body></div>
```

The router reads the current hash from `window.location.hash` and invokes the matching route.

## Component Reference

| Component | Purpose | Output HTML |
| --- | --- | --- |
| `Container` | General container | `div` |
| `Column` | Vertical flex layout | `div` |
| `Row` | Horizontal flex layout | `div` |
| `Text` | Text block | `p` |
| `Image` | Image | `img` |
| `Header` | Page header | `header` |
| `Nav` | Navigation area | `nav` |
| `Footer` | Footer area | `footer` |
| `Link` | Anchor link | `a` |
| `TextField` | Text input | `input type="text"` |
| `Checkbox` | Checkbox input | `input type="checkbox"` |
| `Radio` | Radio button input | `input type="radio"` |
| `TextArea` | Multi-line text area | `textarea` |
| `Form` | Form container | `form` |
| `Section` | Section block | `section` |
| `Select` | Select dropdown | `select` |
| `Button` | Button | `button` |
| `Audio` | Audio element | `audio` |
| `Video` | Video element | `video` |
| `Option` | Select option | `option` |
| `Heading(num, props)` | Header element (`h1` to `h6`) | `h${num}` |
| `Break` | Line break | `br` |
| `Hr` | Horizontal rule | `hr` |

## el() Property Reference

The core helper is `el(el_name, props)`. It accepts a tag name and a props object, and applies several common DOM attributes automatically.

| Property | Description |
| --- | --- |
| `style` | CSS string applied to the element |
| `src` | Source URL for media elements |
| `to` | Maps to `href` for links |
| `type` | Input type such as `text`, `checkbox`, or `radio` |
| `className` | CSS class name mapped to `class` |
| `alt` | Alternative text for images |
| `children` | Array of child elements |
| `text` | Text content inside the element |
| `onClick` | Click event handler |
| `onInput` | Input event handler |
| `holder` | `placeholder` property |
| `onChange` | Change event handler |
| `onKey` | Keydown handler |
| `onFocus` | Focus event handler |
| `onBlur` | Blur event handler |

### Example

```javascript
const input = TextField({
  holder: "Type your name",
  onInput: (e) => console.log(e.target.value),
  style: "padding: 8px; border: 1px solid #ccc;"
});
```

## What Spark.JS Does Not Do

Spark.JS is intentionally minimal and lightweight. It is not meant to replace large frameworks like React, Vue, or Angular in every use case.

It does not provide:

- Advanced centralized state management
- Virtual DOM diffing
- Complex component lifecycle APIs
- Server-side rendering (SSR)
- Static site generation (SSG)
- Full TypeScript-first architecture
- Advanced routing systems
- Full build pipeline tooling
- Large ecosystem of plugins and infrastructure

This makes Spark.JS better suited for small to medium projects, prototypes, educational apps, and simple interfaces where speed and simplicity matter more than framework complexity.

## License

This project is licensed under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Summary

Spark.JS is a lightweight JavaScript framework for building front-end interfaces without dependencies or build tools. It focuses on small, fast, readable UI composition with a Flutter-inspired layout model, simple state updates, and basic hash-based routing. It is ideal for small apps, experiments, and lightweight interfaces where simplicity is a priority.
