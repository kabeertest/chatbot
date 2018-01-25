var app = angular.module('chatApp', ["pubnub.angular.service"]);
app.controller('chatController', function (Pubnub, $scope, $http, $location, $anchorScroll) {
  $scope.chatInput = 'Hi ,How may i help you'
  $scope.chatData = [{ type: 'message', messages: $scope.chatInput, isMe: false }];
  $scope.speak = function (speechtext) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(speechtext));
    $scope.chatInput = '';
  }

  $scope.speak($scope.chatInput)  

  $scope.gotoBottom = function () {
    $location.hash('bottom');
    $anchorScroll();
  };


  $scope.postIt = function () {
    $scope.chatData.push({ type: 'message', messages: $scope.chatInput, isMe: true })
    $scope.chatWithServer();
  }

  $scope.chatWithServer = function () {

    var botServiceUrl = "http://localhost:3000/?user=" + $scope.chatInput
    var requstData = {  };
    var req = {
      method: 'GET',
      url: botServiceUrl,
      data: requstData
    }
    console.log("chat server called req", req)

    $http(req).then(function (res) {
      console.log('sucess  data', res.data)
      if (res.data == '') {
        res.data = "sorry i didnt get that "
      }
      $scope.speak(res.data)
      $scope.chatData.push({ type: 'message', messages: res.data, isMe: false })
    });



    setTimeout(function () {
      $scope.gotoBottom();
    }, 800);
  }
});