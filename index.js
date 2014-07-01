//This is an asset loader queue tailored for Kami/WebGL

var LoaderBase = require('assetloader');
var Class = require('klasse');
var TextureLoader = require('./ext/TextureLoader');
var BaseObject = require('kami-util').BaseObject;

var AssetLoader = new Class({

    Extends: LoaderBase,

    initialize: function(context) {
        if (!(this instanceof AssetLoader))
            return new AssetLoader(context);
        //setup assetloader defaults
        LoaderBase.call(this);

        //setup GL context
        BaseObject.call(this, context);

        this.registerLoader(TextureLoader);
        
        this.__invalidateFunc = function() {
            if (this.context.handleContextLoss)
                this.invalidate();
        }.bind(this);

        if (this.context.restored 
                && typeof this.context.restored.add === "function")
            this.context.restored.add( this.__invalidateFunc );
    },

    destroy: function() {
        if (this.context.restored 
                && typeof this.context.restored.remove === "function")
            this.context.restored.remove(this.__invalidateFunc);
    }
});

//Copy static attributes ...
AssetLoader.Status = LoaderBase.Status;

AssetLoader.registerCommonLoader = LoaderBase.registerCommonLoader;

AssetLoader.Descriptor = LoaderBase.Descriptor;

AssetLoader.TextureLoader = TextureLoader;

module.exports = AssetLoader;








/// old docs. 

    /**
     * This is the loading function of a AssetManager plugin, 
     * which handles the asynchronous loading for an asset. 
     * The function must be implemented in a very
     * strict manner for the asset manager to work correctly.
     *
     * Once the async loading is done, you must call the `finished` callback
     * that was passed to this method. You can pass the parameter `false` to the
     * finished callback to indicate the async load has failed. Otherwise, it is assumed
     * to be successful.
     * 
     * If you don't invoke the callback, the asset manager may never finish loading.
     * 
     * @param  {String} name the name of the asset to load
     * @param {Function} finished the function to call when async loading is complete
     * @param {Texture} texture the texture to operate on for this asset
     * @param {String} path the optional image path to use instead of the `name` parameter
     */
/**
 * This is the default implementation of an image loader plugin for AssetManager.
 * This uses a DOM Image object to upload PNG, GIF and JPG images to a WebGL
 * texture. You will not need to deal with this class directly, unless you want
 * to write your own AssetManager loaders.
 *
 * A Loader plugin is a class which handles the asynchronous loading and provides
 * a convenient return value for the `AssetManager.load()` functions. The loader class
 * is constructed with the following parameters: first, the WebGLContext this AssetManager
 * is using, and second, the name of the asset to be loaded. The subsequent arguments are
 * those that were passed as extra to the `AssetManager.load()` functions.
 *
 * A loader must implement a `load()` function, and it's encouraged to also implement a 
 * `getReturnValue()` function, for convenience.
 * 
 * @param {WebGLContext} context the context, passed by AssetManager
 * @param {String} name the unique key for this asset
 * @param {String} path the optional path or data URI to use, will default to the name param
 * @param {Texture} texture an optional texture to act on; if undefined, a new texture
 *                          will be created
 */