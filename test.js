var test = require('tape').test;

test('testing kami asset loader', function(t) {
    t.plan(4);

    var gl = require('webgl-context')();
    if (!gl)
        throw new Error("No WebGL context found!");
    var assets = require('./')(gl);

    var tex = assets.add('test/pixel-diffuse.png');
    var tex2 = assets.add('test/does-not-exist.png');

    assets.loadError.add(function() {
        t.ok(true, 'received a load error from faulty image path')
    });

    assets.loadStarted.add(function() {
        t.ok(true, 'loading started');
    });

    assets.loadFinished.add(function() {
        t.ok(true, 'loading finished');
    });

    t.equal( typeof tex.bind, 'function', 'returned object is a Texture' );

    //load all assets ...
    assets.load();
});