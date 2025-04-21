FactoryBot.define do
  factory :reward do
    title { Faker::Commerce.product_name }
    description { Faker::Lorem.sentence }
    cost { rand(10..200) }
  end
end
