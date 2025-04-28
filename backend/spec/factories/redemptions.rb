FactoryBot.define do
  factory :redemption do
    user
    reward
    redemption_cost { reward.cost }
  end

end
