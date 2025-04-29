15.times do
    User.create({
        name: Faker::Name.name,
        email: Faker::Internet.email,
        points_balance: rand(0..200),
    })
end
puts "5 users created"

10.times do
    Reward.create({
        title: Faker::Commerce.product_name,
        description: Faker::Lorem.sentence(word_count: 10),
        cost: rand(2..50),
    })
end
puts "10 rewards created"

User.all.each do |user|
    rand(0..4).times do
        reward = Reward.all.sample
        if user.points_balance >= reward.cost
            Redemption.create({
                user_id: user.id,
                reward_id: reward.id,
            })
        end
    end
end