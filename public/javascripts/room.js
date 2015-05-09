function renderMessage(msg, user_id) {
  var html = '';
  var isMe = (msg.sender_id == user_id) ? 'me' : 'you';
  html += '<div class="chatItem ' + isMe + '" sender-id="' + msg.sender_id + '">';
  html += '<div class="chatItemContent">';
  html += '<img class="avatar" src="/images/avatar.png" height="40px" width="40px" username="">';
  html += '<div class="cloud cloudText" un="cloud_1029300659" msgid="1029300659">';
  html += '<div class="cloudPannel" style="">';
  html += '<div class="sendStatus"></div>';
  html += '<div class="cloudBody">';
  html += '<div class="cloudContent">';
  html += msg.body;
  html += '</div>';
  html += '</div>';
  html += '<div class="cloudArrow "></div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}

$(document).ready(function(){

  var $scrollbar = $("#scrollbar1");
  $scrollbar.tinyscrollbar();
  var scrollbarData = $scrollbar.data("plugin_tinyscrollbar")

  var socket = io.connect('ws://localhost:3000');

  var cookie = document.cookie;
  var user_id = null;
  cookie.split(/; */).forEach(function(item) {
    var pair = item.trim().split('=');
    if (pair[0] === 'user_id') {
      user_id = parseInt(pair[1]);
    }
  });

  socket.on('connection', function(data) {
    console.log(data);
    socket.emit('register', { room_id: $('#room_id').val() });
  });

  socket.on('messages', function(data){
    console.log(data);
    $('#chat-chatmsglist').append(renderMessage(data, user_id));
    $('#textInput').val('');
    scrollbarData.update('bottom');
  });

  $("a.chatSend").click(function(){
    sendMessage();
    return false;
  });

  $("#textInput").keypress(function(e) {
    var key = window.event ? e.keyCode : e.which;
    if (key == 13) {
      sendMessage();
    }
  });

  function sendMessage() {
    var $msg = $("#textInput");
    if ($msg.val().trim() === '') {
    } else {
      socket.emit('new message', {
        sender_id: user_id,
        session_id: $('#room_id').val(),
        body: $msg.val()
      });
    }
  };

  $("#closeIcon").click(function(){
    $("#closeForm").submit();
  });

});

//http://stackoverflow.com/questions/15232435/what-is-the-right-way-to-use-the-tinyscrollbar-update-function-with-a-jquery-onc
