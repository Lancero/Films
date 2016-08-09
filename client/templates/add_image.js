var imdb = require('imdb-api');
Template.add_image.onRendered (function(){
  console.log(imdb);
  // imdb.getReq({name: 'Lion King'}, function(error, result){
  //   console.log(error, result);
  // })
})