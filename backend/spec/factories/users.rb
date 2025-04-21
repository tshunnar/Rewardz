FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    points_balance { rand(0..100) }
    is_deleted { false }
  end
end
