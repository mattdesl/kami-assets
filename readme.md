# kami-assets

This overrides [assetloader](https://github.com/mattdesl/assetloader) to provide some [kami](https://github.com/mattdesl/kami)-specific features. The return type for images are `Texture` objects.

Unlike the regular assetloader, this requires you pass a `WebGLContext` (from Kami) to the constructor, in order to manage the textures that are loaded. The AssetLoader will also be re-run on context loss. 

# example

```js
var AssetLoader = require("assetloader");

var WebGLContext = require('kami').WebGLContext;

//setup our WebGL context
var context = new WebGLContext(300, 200);

//create a new asset loader __with the context__
var assets = new AssetLoader(context);

//the returned objects are Textures
var tex1 = assets.add("img/scene.png");
var tex2 = assets.add("img/grass.png");

//so we can operate on them like so:
tex1.setFilter(Texture.Filter.LINEAR);

function update() {
    requestAnimationFrame(update);

    if (assets.update()) {
        //Show your game...
    } else {
        //Game is loading.. show a preloader
    }
}

requestAnimationFrame(update);
```