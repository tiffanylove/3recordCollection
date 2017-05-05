console.log('test');

$(document).ready(onReady);

function onReady(){
  console.log('jq');
  //event listeners
$('#submitButton').on('click', addRecord);
$(document).on('click', '#delete', deleteRecord);
$(document).on('click', '#update', updateRecord);
$(document).on('click', '#changed', changeRecord);

grabRecord();


}//end onReady


function addRecord(){
  console.log('Record added');
  var objectToSend = {
    artist: $('#artistIn').val(),
    imageUrl: $('#imageIn').val(),
    name: $('#albumIn').val(),
    releaseYear: $('#yearIn').val()
  };
  $.ajax({
    type: 'POST',
    url: '/addRecord',
    data: objectToSend,
    success: function(response){
      console.log('got it! I think.');
      grabRecord();
    }
  }); //end ajax

}//end addRecord

function grabRecord() {
  console.log('grabbed Record maybe?');
  $.ajax({
    type: 'GET',
    url: '/grabRecord',
    success: function (response) {
      console.log('album', response);
      var outputDiv = $('#outputDiv');
      outputDiv.empty();
      for(var i=0; i<response.length; i++){
        var textToAppend = '<div class="col-sm-3 col-xs-5" id="recordCase">';
        textToAppend += '<img src="'+ response[i].imageUrl +'" data-url="'+ response[i].imageUrl+'" style="width:100%"/>';
        textToAppend += '<p id="artist">' + response[i].artist + '</p>';
        textToAppend += '<p id="name">' + response[i].name + '</p>';
        textToAppend += '<p id="year">' +  response[i].releaseYear + '</p>';
        textToAppend += '<button id="delete" class="btn" data-id="'+ response[i]._id+'">Delete</button>';
        textToAppend+= '<button id="update" class="btn" data-id="'+response[i]._id+'">Update</button><div id="updateDiv"></div></div>';
        outputDiv.append(textToAppend);
      }

    }
  }); // end ajax
}

function deleteRecord(){
  var idToSend = {
    _id: $(this).data('id')
  };
  $.ajax({
    url: '/wackRecord',
    type: 'DELETE',
    data: idToSend,
    success: function(response){
      console.log('That album was wack!');
      //"refreshing" page to get all records
      grabRecord();
    }
  });
}

function updateRecord(){
  var parent = $(this).parent();
  parent.find("#updateDiv").empty();
  //when click update append these edit inputs with previous info using parent of update button
  parent.find("#updateDiv").append("<p><input id='changedArtist' value='"+parent.find('#artist').text()+"'></p>");
  parent.find("#updateDiv").append("<p><input id='changedAlbum' value='"+parent.find('#name').text()+"'></p>");
  parent.find("#updateDiv").append("<p><input id='changedYear' value='"+parent.find('#year').text()+"'></p>");
  parent.find("#updateDiv").append("<p><input id='changedImage' value='"+parent.find('img').data('url')+"'></p>");
  parent.find("#updateDiv").append("<button class='btn' id='changed' data-id='"+$(this).data('id')+"' val=''>Change</button>");
}
function changeRecord(){
  var objectToSend = {
    _id: $(this).data('id'),
    artist: $('#changedArtist').val(),
    imageUrl: $('#changedImage').val(),
    name: $('#changedAlbum').val(),
    releaseYear: $('#changedYear').val()
  };
  $.ajax({
    type: 'PUT',
    url: '/updateRecord',
    data: objectToSend,
    success: function(response){
      console.log(response);
      //"refreshing" page to get all records
      grabRecord();
    }
  });
}
