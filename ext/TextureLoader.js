var Texture = require('kami-texture');


//this is a kami-specific loader for a Texture object
//it is assumed that the AssetManager being passed is a WebGLContext
function TextureLoader(name, path, texture, genMipmaps) {
    path = path || name;

    texture = texture || new Texture(this.context);
    
    return {

        value: texture,

        load: function(onComplete, onError) {
            //Texture has a handy function for this sort of thing...
            texture.setup(path, onComplete, onError, genMipmaps);
        }
    };
}

//Setup loader parameters
TextureLoader.extensions = ["png", "gif", "jpg", "jpeg"];
TextureLoader.mediaType = "image";

module.exports = TextureLoader;