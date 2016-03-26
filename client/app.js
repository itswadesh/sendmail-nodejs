'use strict';

angular.module('sendmailApp', [])
.controller('MailController', function ($scope,$http) {
  $scope.loading = false;
  $scope.send = function (mail){
    $scope.loading = true;
    $http.post('/sendmail', {
      from: 'CodeNx <admin@angularcode.com>',
      to: 'support@codenx.com',
      subject: 'Message from AngularCode',
      text: mail.message
    }).then(res=>{
        $scope.loading = false;
        $scope.serverMessage = 'Email sent successfully';
    });
  }
})