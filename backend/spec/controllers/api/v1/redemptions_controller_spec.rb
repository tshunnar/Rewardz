require 'rails_helper'

RSpec.describe Api::V1::RedemptionsController, type: :controller do
  let(:user) { FactoryBot.create(:user, points_balance: 200) }
  let(:reward) { FactoryBot.create(:reward, cost: 30 )}
  let(:redemption) { FactoryBot.create(:redemption, user: user, reward: reward) }

  before do
    redemption
  end
  

  describe 'GET #index' do
    it 'returns a list of redemptions' do
      get :index
      expect(response).to have_http_status(:ok)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response).to have_key('redemptions')
      expect(parsed_response['redemptions']).to be_an(Array)
      expect(parsed_response['redemptions'].size).to eq(1)
    end

    it 'returns paginated results' do
      get :index, params: { page: 1 }
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['meta']['total_pages']).to eq(1)
      expect(parsed_response['meta']['current_page']).to eq(1)
      expect(parsed_response['meta']['next_page']).to be_nil
      expect(parsed_response['meta']['prev_page']).to be_nil
    end
  end

  describe 'GET #show' do
    it 'returns the redemption if found' do
      get :show, params: { id: redemption.id }
      expect(response).to have_http_status(:ok)
    end

    it 'returns not found if redemption does not exist' do
      get :show, params: { id: -1 }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'POST #create' do
    it 'creates a new redemption' do
      post :create, params: { redemption: { user_id: user.id, reward_id: reward.id } }
      expect(response).to have_http_status(:created)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response).to have_key('id')
      expect(parsed_response['user_id']).to eq(user.id)
      expect(parsed_response['reward_id']).to eq(reward.id)      
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the redemption' do
      delete :destroy, params: { id: redemption.id }
      expect(response).to have_http_status(:no_content)
    end
  end
end
