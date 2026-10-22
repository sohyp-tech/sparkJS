function el(el_name, props) {
    if ( el_name ) {
        const el = document.createElement(el_name)
        if (props) {
            if (props.style) {
                el.setAttribute("style",props.style)
            }
            if(props.src) {
                el.setAttribute("src", props.src)
            }
           if(props.to) {
                el.setAttribute("href", props.to)
            }
            if(props.type) {
                el.setAttribute("type", props.type)
            }
            if(props.className) {
                el.setAttribute("class", props.className)
            }
            if (props.alt) {
                el.alt = props.alt
            }
            if (props.children) {
                props.children.forEach(child => {
                    if (child) el.appendChild(child)
                });
            }
            if(props.text) {
                el.textContent = props.text
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
    props.type = "text"
    return el("input",props)
}

function Checkbox(props) {
    props.type = "checkbox"
    return el("input",props)
}

function Radio(props) {
    props.type = "radio"
    return el("input",props)
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
    return("video", props)
}


function getHTMLElement(tag_name, has_class_or_id) {
    if (has_class_or_id && !tag_name) {
        const element = document.querySelector(has_class_or_id)
        return element;
    }  else {
        const element = document.querySelector(tag_name)
        return element;
    }
}

function mount(has_class_or_id, the_component) {
    document.querySelector(has_class_or_id).appendChild(the_component)
}


function textState(object_name, key, text, el) {
    let element = el
    if (element) element.textContent = text

    Object.defineProperty(object_name, key, {
        get() {
            return text;
        },
        set(new_text) {
            let txt = new_text
            if (txt) element.textContent = new_text
        }
    });
}

function elementsState(obj_name, key, code, element) {
    el = element;
    if (el) el.innerHTML = code

    Object.defineProperty(obj_name, key, {
        get() {
            return code;
        },
        set(new_els) {
            let els = new_els
            if (els) el.innerHTML = els
        }
    });
}



function createSparkRouter(route) {
    function render() {
        const current_path = window.location.hash.slice(1) || "/";
        const cont = route[current_path];
        const app = document.querySelector("[sk-body]")
        if (app) {
            app.innerHTML = "";
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
    console.info("You are using Spark.JS now, to know how to use go => https://sohyp-tech.github.io/sparkJS-documentation");
} 
