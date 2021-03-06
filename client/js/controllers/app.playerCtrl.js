'use strict';
var app = angular.module('app.playerCtrl', ['app.factory']);

app.controller('playerCtrl', ['$scope', 'socket', function($scope, socket)
{
    var self = this;

    self.started = false;
    self.is_playing = false;

    self.start = function(address_streaming, lang, fname)
    {
        socket.emit('start_player', {url: address_streaming, lang: lang, fname: fname});
        self.started = true;
        self.is_playing = true;
    }

    self.pause = function()
    {
        if(!self.started) return;
        socket.emit('pause_player');
        self.is_playing = !self.is_playing;
    }

    self.forward = function()
    {
        if(!self.started) return;
        socket.emit('forward_player');
        self.is_playing = true;
    }

    self.backward = function()
    {
        if(!self.started) return;
        socket.emit('backward_player');
        self.is_playing = true;
    }

    self.volume_up = function()
    {
        if(!self.started) return;
        socket.emit('volume_up');
    }

    self.volume_down = function()
    {
        if(!self.started) return;
        socket.emit('volume_down');
    }

    self.stop = function()
    {
        if(!self.started) return;
        socket.emit('stop_player');
        self.is_playing = false;
        self.started = false;
    }

}]);
