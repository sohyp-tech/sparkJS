# ⚡ Spark.JS

> A lightweight, zero-dependency, Flutter-inspired JavaScript UI framework for building fast and modern web applications with pure reactive state management and simple declarative syntax.

---

## ✨ Features

- 🚀 **Zero Dependencies & Zero Build Tools:** No Node.js, Webpack, Babel, or Vite required. Just link and code!
- 💙 **Flutter-like Syntax:** Declarative layout components (`Column`, `Row`, `Container`, `Text`, etc.).
- 🔄 **Reactive State Management:** Instant reactive data-binding using `textState` and `elementsState`.
- 🗺️ **Built-in Hash Router:** Simple SPA routing out-of-the-box using `createSparkRouter`.
- 🪶 **Ultra Lightweight:** Extremely small footprint, executing native DOM manipulations directly.

---

## 💻 Quick Start

Simply include  `index.js` file in your HTML document:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Spark.JS App</title>
</head>
<body>

    <!-- Container for mounting the Spark app -->
    <div id="app"></div>

    <script src="https://sohyp-tech.github.io/sparkJS/index.js"></script>
    <script>
        // Build your UI using Spark components
        const appUI = Column({
            style: "gap: 15px; margin-top: 50px;",
            children: [
                Text({ text: "Hello World from Spark.JS! ⚡", style: "font-size: 24px; font-weight: bold;" }),
                Button({
                    text: "Click Me",
                    style: "padding: 10px 20px; cursor: pointer;",
                    onClick: () => alert("Spark.JS is Awesome!")
                })
            ]
        });

        // Mount your app component
        mount("#app", appUI);
    </script>
</body>
</html>
```

---

## ⚡ Reactive State Management Example

Spark.JS provides simple reactive bindings via `textState` and `elementsState` using native JavaScript property descriptors.

#See all thing in documentaition `https://sohyp-tech.github.io/sparkJS-documentaion`

## Thanks
**Made With Love By Sohyp Khaled.  💙