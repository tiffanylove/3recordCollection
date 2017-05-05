console.log('test');

$(document).ready(onReady);

function onReady(){
  console.log('jq');
$('#submitButton').on('click', addRecord);
$(document).on('click', '#delete', deleteRecord);
$(document).on('click', '#update', updateRecord);
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
        textToAppend += '<img src="'+ response[i].imageUrl +'" style="width:100%"/>';
        textToAppend += '<p>' + response[i].artist + '</p>';
        textToAppend += '<p>' + response[i].name + '</p>';
        textToAppend += '<p>' +  response[i].releaseYear + '</p>';
        textToAppend += '<button id="delete" class="btn" data-id="'+ response[i]._id+'">Delete</button>';
        textToAppend+= '<button id="update" class="btn" data-id="'+response[i]._id+'">Update</button></div>';
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
      grabRecord();
    }
  });
}

function updateRecord(){
  $(this).parent().append("<p><input placeholder='artist' id='changedArtist'></p>");
  $(this).parent().append("<p><input placeholder='album' id='changedAlbum'></p>");
  $(this).parent().append("<p><input placeholder='year released' id='changedYear'></p>");
  $(this).parent().append("<p><input placeholder='image url' id='changedImage'></p>");
  $(this).parent().append("<button class='btn' id='changed'>Change</button>");

  var objectToSend = {

  };
  $.ajax({
    type: 'PUT',
    url: '/updateRecord',
    data: objectToSend,
    success: function(response){
      console.log(response);
    }
  });
}
