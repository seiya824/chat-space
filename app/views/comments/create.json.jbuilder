json.id        @comment.id
json.comment   @comment.comment
json.date      @comment.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @comment.user.name
json.image     @comment.image.url

# json.KEY VALUEの形
# jsファイルに返ってきたデータをjbuilderで定義したキーとバリューの形で呼び出して使える