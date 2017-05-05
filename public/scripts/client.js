console.log('test');

$(document).ready(onReady);

function onReady(){
  console.log('jq');
$('#submitButton').on('click', addRecord);
$(document).on('click', '#delete', deleteRecord);
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
        var textToAppend = '<div class="col-sm-3" id="recordCase">';
        textToAppend += '<img src="'+ response[i].imageUrl +'" alt="">';
        textToAppend += '<p>' + response[i].artist + '</p>';
        textToAppend += '<p>' + response[i].name + '</p>';
        textToAppend += '<p>' +  response[i].releaseYear + '</p>';
        textToAppend += '<button id="delete" data-id="'+ response[i]._id+'">Delete</button></div>';
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
