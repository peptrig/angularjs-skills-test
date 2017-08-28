(function () {
  'use strict';

  angular.module('ngskilltest')
    .controller('VideoCallController', VideoCallController);

  /* @ngInject */
  function VideoCallController($sce) {
    var vm = this;
    vm.localSrc = undefined;
    vm.remoteSrc = undefined;
    vm.call = call;

    var ext = Math.random().toString(36).substr(2, 3);
    var localPeerId = 'op' + ext;
    var remotePeerId = 'xp' + ext;
    var peer;
    var localStream;

    init();

    function init() {
      console.log('Expert id: ' + remotePeerId);

      peer = new Peer(localPeerId, {
        key: 'mzqg85joa9py14i'
      });

      peer.on('call', function (call) {
        if (localStream) {
          call.answer(localStream);
        }
      });

      peer.on('error', function (error) {
        console.log(error);
      });

      navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
        })
        .then(function (stream) {
          localStream = stream;
          vm.localSrc = $sce.trustAsResourceUrl(window.URL.createObjectURL(stream));
        })
        .catch(function (error) {
          console.log('getUserMedia() error: ' + error.name);
        });
    }

    function call() {
      var call = peer.call(remotePeerId, localStream);

      call.on('stream', function (remoteStream) {
        vm.remoteSrc = $sce.trustAsResourceUrl(window.URL.createObjectURL(remoteStream));
      });
    }
  }

})();
