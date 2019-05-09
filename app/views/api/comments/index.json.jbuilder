json.array! @comments do |comment|
  json.id        comment.id
  json.comment   comment.comment
  json.date      comment.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name comment.user.name
  json.image     comment.image.url
end
