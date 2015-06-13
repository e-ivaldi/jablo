(function () {

    var FileReader = function () {

        var byteArray = function (path) {
            var bytes = [];
            var xhr = new XMLHttpRequest();
            var url = 'mpq/' + path;
            //yep synchronous calls are deprecated
            xhr.open('GET', url, false);

            xhr.overrideMimeType('text/plain; charset=x-user-defined');
            xhr.send();

            if (xhr.status == 200) {
                console.log("200 yeah");
                var binStr = xhr.responseText;
                var binStrLength = binStr.length;
                for (var i = 0; i < binStrLength; i++) {
                    bytes[bytes.length] = binStr.charCodeAt(i) & 0xff;
                }
            } else {
                console.log("Argh! Something went wrong downloading the file " + url)
                console.log("status: " + xhr.status);
            }
            return bytes;
        };

        return {
            byteArray: byteArray
        }

    };

    var Colour = function (r, g, b) {
        var _r = r;
        var _g = g;
        var _b = b;

        var r = function () {
            return _r;
        }

        var g = function () {
            return _g;
        }

        var b = function () {
            _b;
        }

        var toString = function () {
            return "(" + _r + "," + _g + "," + _b + ")";
        }

        return {
            r: r,
            g: g,
            b: b,
            toString: toString
        }
    }

    var Palette = function (path, fileReader) {

        var _bytes = fileReader.byteArray(path);
        var _bytesLength = _bytes.length;
        var _colours = [];

        for (var i = 0; i < _bytesLength; i += 3) {
            _colours[_colours.length] = new Colour(_bytes[i], _bytes[i + 1], _bytes[i + 2]);
        }

        var colours = function () {
            return _colours;
        }

        return {
            colours: colours
        }
    }

    var Game = function () {

        var run = function () {
            console.log("Game is running like there's no tomorrow!");
            //let's try to load a palette file from the internetz
            var fileReader = new FileReader();
            var pal = new Palette("levels/towndata/town.pal", fileReader)
            console.log("pal:" + pal);
            console.log("this should be 0,0,0 -> " + pal.colours()[0].toString());
            console.log("this should be 255,255,255 -> " + pal.colours()[255].toString());

        };

        return {
            run: run
        };
    }

    var game = new Game();
    game.run();

})();
