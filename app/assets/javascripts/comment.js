$(function() {
  function buildHTML(comment) {
    var img = comment.image == null ? "" : `<img src="${comment.image}" class="upload-image">`
    
    var html = `<div class="contents__comment__data" data-id="${comment.id}">
                  <p class="name">
                    ${comment.user_name}
                  </p>
                  <p class="day">
                    ${comment.date}
                  </p>
                  <p class="comment">
                    ${comment.comment}
                    <br>
                    ${img}
                  </p>
                </div>`
  return html;
  }
  $('#new_comment').on('submit', function(e) {
    //フォームが送信された時に関数が発火
    e.preventDefault();
    //イベントの停止
    var comment = new FormData(this);
    //commentに入力された値を代入
    var url = window.location.href
    //現在を表示
    $.ajax({
      url: url,
      type: 'POST',
      data: comment,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      //通信成功時
      var html = buildHTML(data);
      $('.contents__comment').append(html);
      //セレクタにhtmlを追加
      $("form")[0].reset();
      //フォームをリセット
      $('.form-send').prop('disabled', false);
      // ボタンの解除

      $('.contents__comment').animate({scrollTop: $('.contents__comment')[0].scrollHeight}, 'swing');
      //$('要素名').animate({'動かすプロパティ' : '動かす縦横の幅'});
    })
    .fail(function() {
      alert('入力してください');
    })
  })
  // 自動更新
  var reloadComments = function() {
    var last_comment_id = $('.contents__comment__data:last').data('id');
    // ここで最後に更新されたdata-idを代入
    var group_id = $(".contents__comment").data("group-id");
    // url用にgroup_idを代入
    if(last_comment_id != undefined) {
      // コメントが更新されたらajaxへ
      $.ajax({
        url: "/groups/"+ group_id +"/api/comments",
        type: "get",
        dataType: "json",
        data: {id: last_comment_id}
      })
      .done(function(comments) {
        var insertHTML = '';
        // 空の変数を作成
        comments.forEach(function(comment) {
          var html = buildHTML(comment);
          // htmlに代入
          insertHTML += html
          // 空の''にhtmlを入れる
          // ここで一旦区切る  区切らずappendすると重複してしまう
        })
        $('.contents__comment').append(insertHTML);
        $('.contents__comment').animate({scrollTop: $('.contents__comment')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert("自動更新に失敗しました")
      });
    }
  };
  setInterval(reloadComments, 5000);
});