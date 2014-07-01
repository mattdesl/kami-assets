# kami-assets

This overrides [assetloader](https://github.com/mattdesl/assetloader) to provide some [kami](https://github.com/mattdesl/kami)-specific features. The return type for images are [kami-texture](https://github.com/mattdesl/kami-texture) objects.

This asset loader expects a GL context (or a kami-context). If the provided context is a kami-context with `handleContextLoss`, assets will be invalidated upon context restore, which will froce a re-run of the preloader. 

# example

Typical usage with a render loop could look like this:

```js
//create a canvas..
var gl = require('kami-context')({
	width: 250,
	height: 250
});

document.body.appendChild(gl.canvas);

//create a new asset loader
var assets = require('kami-assets')(gl);

//the returned objects are kami-textures
var tex1 = assets.add("img/scene.png");
var tex2 = assets.add("img/grass.png");

//so we can operate on them like so:
tex1.setFilter(Texture.Filter.LINEAR);

function update() {
    requestAnimationFrame(update);

    //tick forward to the next asset in the preloader
    if (assets.update()) {
    	//returns true when all assets are loaded,
        //render your game..
    } else {
        //game is loading.. show a preloader
    }
}

requestAnimationFrame(update);
```