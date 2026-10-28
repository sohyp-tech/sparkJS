function el(el_name, props) {
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
                    el.appendChild(child instanceof Node ? child : String(child));
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

function Container(props) {
    return el("div",props)
}

function Column(props) {
    const column_style = "display: flex;justify-content: center;align-items: center;flex-direction: column;"
    props.style = props.style ?  column_style + " " + props.style : column_style
    return el("div", props)
}

function Row(props) {
    const row_style = "display: flex;justify-content: center;align-items: center;flex-direction: row;"
    props.style = props.style ?  row_style + " " + props.style : row_style
    return el("div", props)
}

function Text(props) {
    return el("p",props)
}

function Image(props) {
    return el("img",props)
}

function Header(props) {
    return el("header",props)
}

function Nav(props) {
    return el("nav",props)
}

function Footer(props) {
    return el("footer",props)
}

function Link(props) {
    return el("a",props)
}

function TextField(props) {
    return el("input",{ ...props, type: props.type || "text" })
}

function Checkbox(props) {
    return el("input",{ ...props, type: props.type || "checkbox" })
}

function Radio(props) {
    return el("input",{ ...props, type: props.type || "radio" })
}

function TextArea(props) {
    return el("textarea",props)
}

function Form(props) {
    return el("form",props)
}

function Section(props) {
    return el("section",props)
}

function Select(props) {
    return el("select",props)
}

function Button(props) {
    return el("button", props)
}

function Audio(props) {
    return el("audio", props)
}

function Video(props) {
    return el("video", props)
}

function Option(props) {
    return el("option", props)
}

function Heading(num, props) {
    if (num > 6 && num < 1) return;
    const heading_num = `h${num}`
    return el(heading_num, props)
}

function Break(props) {
    return el("br", props)
}

function Hr(props) {
    return el("hr", props)
}

function getHTMLElement(el) {
    return document.querySelector(el);
}

function mount(selector, the_component) {
    const el = document.querySelector(selector)
    if (!el) {
        console.error(`Error: element ${selector} not found`);
        return;
    }
    el.appendChild(the_component)
}

function setContent(element, content) {
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

function TextStateController(object_name, key, text, el) {
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

function WidgetStateController(obj_name, key, code, element) {
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



function createSparkRouter(route) {
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
