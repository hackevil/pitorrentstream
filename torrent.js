'use strict';

var torrent_stream = require('torrent-stream');
var fs = require('fs');
var promise = require('bluebird');
var engine;

module.exports = { 
    create : function(magnet, cb){
        var files = promise.defer();
        try{
            engine = torrent_stream(magnet, {path: '/tmp/pi-torrent'});
            engine.on('ready', function() {
                var file_hash = {};
                engine.files.forEach(function(file){
                    file_hash[file.name] = {
                        name: file.name, 
                        path: file.path,
                        startPiece: file.offsetPiece,
                        endPiece: file.endPiece,
                        pieces: []
                    };
                });
                files.resolve(file_hash);
            });
            engine.on('download', cb);
        }
        catch(err){
            files.reject(err);
        }
        return files.promise;
    },

    start_stream : function(filename){
        for (var i = 0; i < engine.files.length; ++i)
            if (filename == engine.files[i].name)
            {
                engine.files[i].select();
                break;
            }
    },
}
