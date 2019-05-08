$(function() {
  var search_list = $('#user-search-result');
  function appendUserToSearchList(user){
    var html =`<div class="chat-group-user clearfix" id='chat-group-user-${user.id}'>
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    search_list.append(html);
  }

  function appendNoUserToSearchList(answer) {
    var html = `<div class="chat-group-user clearfix">${answer}</div>`
  }

  function appendUserToMemberList(id,name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input class="user_ids" name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id=${id}>削除</div>
              </div>`

    $('#chat-group-users').append(html);
  }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(user) {
      $("#user-search-result").empty();
        if (user.length !== 0) {
          var group_ids = [];
          $('.user_ids').each(function(){
            group_ids.push($(this).val());
          });
          user.forEach(function(user){
            if(group_ids.indexOf(String(user.id)) == -1 ) {
            appendUserToSearchList(user);
            }
          });
        }
        else {
          appendNoUserToSearchList("一致するユーザーはいません");
        }
      })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(function(){
    $(document).on('click', '.user-search-add', function() {
      var id = $(this).attr("data-user-id");
      var name = $(this).attr("data-user-name");
      appendUserToMemberList(id, name);
      $(this).parent().remove();
    });
    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});
});