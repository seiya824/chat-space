class Group < ApplicationRecord
  
  has_many :comments
  has_many :members
  has_many :users, through: :members
  validates :name, presence: true

  def show_last_comment
    if (last_comment = comments.last).present?
      last_comment.comment? ? last_comment.comment : '画像が投稿されています'
    else
      'まだメッセージはありません'
    end
  end
end
