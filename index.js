export function Widget(el_name, props) {
    if ( el_name ) {
        const el = document.createElement(el_name);
        if (props && typeof props == "object") {
            if (props.style) {
                el.setAttribute("style",String(props.style));
            }
            if(props.src) {
                el.setAttribute("src", String(props.src));
            }
           if(props.to) {
                el.setAttribute("href", String(props.to));
            }
            if(props.type) {
                el.setAttribute("type", String(props.type));
            }
            if(props.className) {
                el.setAttribute("class", String(props.className));
            }
            if (props.alt) {
                el.setAttribute("alt", String(props.alt));
            }
            if(props.text) {
                el.textContent = String(props.text);
            }
            if (props.children) {
                const kids = [props.children].flat(Infinity);
                for (const child of kids) {
                    if (child == null) continue;
                    el.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
                }
            }
            if (props.onClick) {
                el.addEventListener("click", props.onClick)
            }
            if (props.onInput) {
                el.addEventListener("input", props.onInput)
            }
            if (props.holder) {
                el.setAttribute("placeholder", props.holder)
            }
            if (props.onChange) {
                el.onchange = (e) => props.onChange(e);
            }
            if (props.onKey) {
                el.onkeydown = (e) => props.onKey(e);
            }
            if (props.onFocus) {
                el.onfocus = (e) => props.onFocus(e);
            }
            if (props.onBlur) {
                el.onblur = (e) => props.onBlur(e);
            }
        }
        return el;
    }
}

export function Container(props) {
    return Widget("div",props)
}

export function Column(props) {
    const column_style = "display: flex;justify-content: center;align-items: center;flex-direction: column;"
    props.style = props.style ?  column_style + " " + props.style : column_style
    return Widget("div", props)
}

export function Row(props) {
    const row_style = "display: flex;justify-content: center;align-items: center;flex-direction: row;"
    props.style = props.style ?  row_style + " " + props.style : row_style
    return Widget("div", props)
}

export function Text(props) {
    return Widget("p",props)
}

export function Image(props) {
    return Widget("img",props)
}

export function Header(props) {
    return Widget("header",props)
}

export function Nav(props) {
    return Widget("nav",props)
}

export function Footer(props) {
    return Widget("footer",props)
}

export function Link(props) {
    return Widget("a",props)
}

export function TextField(props) {
    return Widget("input",{ ...props, type: props.type || "text" })
}

export function Checkbox(props) {
    return Widget("input",{ ...props, type: props.type || "checkbox" })
}

export function Radio(props) {
    return Widget("input",{ ...props, type: props.type || "radio" })
}

export function TextArea(props) {
    return Widget("textarea",props)
}

export function Form(props) {
    return Widget("form",props)
}

export function Section(props) {
    return Widget("section",props)
}

export function Select(props) {
    return Widget("select",props)
}

export function Button(props) {
    return Widget("button", props)
}

export function Audio(props) {
    return Widget("audio", props)
}

export function Video(props) {
    return Widget("video", props)
}

export function Option(props) {
    return Widget("option", props)
}

export function Heading(num, props) {
    if (num > 6 || num < 1) return;
    const heading_num = `h${num}`
    return Widget(heading_num, props)
}

export function Break(props) {
    return Widget("br", props)
}

export function Hr(props) {
    return Widget("hr", props)
}

export function Icon(props) {
    return Widget("span", props)
}

export function IconByClassName(props) {
    return Widget("i", props)
}

export function getHTMLElement(el) {
    return document.querySelector(el);
}

export function mount(selector, the_component) {
    const el = document.querySelector(selector)
    if (!el) {
        console.error(`Error: element ${selector} not found`);
        return;
    }
    el.appendChild(the_component)
}

export function setContent(element, content) {
    if (content == null) {
        element.replaceChildren();
    } else if (typeof content === "string" || typeof content === "number") {
        element.textContent = String(content);
    } else if (content instanceof Node) {
        element.replaceChildren(content);
    } else if (Array.isArray(content)) {
        element.replaceChildren(...content.filter(c => c instanceof Node));
    } else {
        element.textContent = String(content);
    }
}

export function TextStateController(object_name, key, text, el) {
    object_name[key] = text;
    if (el) el.textContent = text;

    const proxy = new Proxy(object_name, {
        set(target, prop, value) {
            target[prop] = value;
            if (prop === key && el) {
                el.textContent = value;
            }
            return true;
        }
    });
    return proxy;
}

export function WidgetStateController(obj_name, key, code, element) {
    obj_name[key] = code;
    if (element) setContent(element, code);

    const proxy = new Proxy(obj_name, {
        set(target, prop, value) {
            target[prop] = value;
            if (prop === key && element) {
                setContent(element, value);
            }
            return true;
        }
    });
    return proxy;
}

export function fetchURL(url, options = {}) {
    if (options) {
        const thenFn = typeof options.thenFn === "function" ? options.thenFn : null;
        const catchErr = typeof options.catchErr === "function" ? options.catchErr : null;
        
        let fetchPromise;
        if (options.method) {
            fetchPromise = fetch(url, {
                method: options.method,
                headers: options.headers,
                body: JSON.stringify(options.body)
            })
        } else {
            fetchPromise = fetch(url)
        }
        return fetchPromise
        .then( res => res.json())
        .then(data => {
            if (thenFn) thenFn(data);
            return data;
        })
        .catch(err => {
            if (catchErr) catchErr(err);
            else console.error("fetchURL error:", err);
            throw err;
        })
    }
}

export function openURL( url, { target = "_blank" } = {} ) {
    window.open(url, target, "noopener,noreferrer")
}

export function showTost(text, delay = 2000) {
    const tost = Widget("div",{
        text: text,
        style: `position:fixed;
            bottom:20px;
            left:50%;
            transform:translateX(-50%);
            background:#333;
            color:#fff;
            padding:10px 18px;
            border-radius:20px;
            z-index:9999;`
    });
    document.body.appendChild(tost);
    setTimeout(() => tost.remove(), delay);
}

export function setDataToClipbord(text) {
    try {
        navigator.clipboard.writeText(text);
        showTost("copied!");
        return true;
    } catch {
        showTost("Couldn't Copy!");
        return false;
    }
}

export function createSparkRouter(route) {
    function render() {
        const current_path = window.location.hash.slice(1) || "/";
        const cont = route[current_path];
        const app = document.querySelector("[sk-body]");
        if (!app) {
            console.error("Router: [sk-body] not found");
            return;
        }
        if (app) {
            app.replaceChildren();
        }
        if (cont) {
            cont(); 
        } else {
            if (route["/404"]) {
                route["/404"]();
            }
        }
    }

    window.addEventListener("hashchange", render);
    
    render();
}

window.onload = () => {
    console.info("You are using Spark.JS now, to know how to use go => https://sohyp-tech.github.io/sparkJS-documentaition/");
}
