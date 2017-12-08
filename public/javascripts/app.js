angular.module('comment', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope, $http){
    $scope.test = 'Hello world!';
    $scope.comments = [];
    $scope.cart = [];

    $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
      console.log("product_data: "+data);
    });
  };

    $scope.addComment = function() {
      var newObject = {title:$scope.formContent,upvotes:0};
      // $scope.comments.push(newObject);
      // $scope.formContent = "";
      if($scope.formContent === '') { return; }
      console.log("In addComment with "+$scope.formContent+" "+$scope.formPrice+" "+$scope.formPic);
      $scope.create({
        title: $scope.formContent,
        upvotes: 0,
        price: $scope.formPrice,
        picURL: $scope.formPic
      });
      $scope.formContent = '';
      $scope.formPrice = '';
      $scope.formPic = '';
    };

    $scope.purchase = function() {
        $scope.cart = [];
        angular.forEach($scope.comments, function(x) {
            if (x.addToCart) {
              $scope.incrementUpvotes(x);
              $scope.cart.push(x);
              x.addToCart = false;
            }
        });
    };

    $scope.incrementUpvotes = function(comment) {
      //comment.upvotes++;
      $scope.upvote(comment);
    };

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes += 1;
        });
    };

    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();

    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

  }
]);
