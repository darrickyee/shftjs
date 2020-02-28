# shftjs
index.html:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Simple drag</title>
    </head>
    <body>
        <div
            id="dragme"
            style="position: relative; height: 40px; width: 40px; background-color: red;"
        ></div>
        <script src="script.js"></script>
    </body>
</html>
```

script.js:

```js
import shft from 'shftjs';
const { drag, util } = shft;

const myelem = document.querySelector('#dragme');
drag(myelem);

// Add default movement function
myelem.addEventListener('drag', util.defaultmove);
```
