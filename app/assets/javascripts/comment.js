$(function() {
  function buildHTML(comment) {
    var img = comment.image == null ? "" : `<img src="${comment.image}" class="upload-image">`
    var html = `<p class="name">
        ${comment.user_name}
      </p>
      <p class="day">
        ${comment.date}
      </p>
      <p class="comment">
        ${comment.comment}
        <br>
        ${img}
      </p>`
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
      console.log(data)
      $('.form-message').val('');
      //inputの削除
      $('upload-image').val('');
      //画像の削除
      $('.form-send').prop('disabled', false);
      // ボタンの解除

      $('.contents__comment').animate({scrollTop: $('.contents__comment')[0].scrollHeight}, 'swing');
      //$('要素名').animate({'動かすプロパティ' : '動かす縦横の幅'});
      //
    })
    .fail(function() {
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
});