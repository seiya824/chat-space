FactoryBot.define do
  factory :comment do
    comment {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/no_image.jpg")}
    user
    group
  end
end
