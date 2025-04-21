module Api
  module V1
    class RewardsController < ApplicationController
      before_action :set_reward, only: [:show, :update, :destroy]

      def index
        @rewards = Reward.active.order(:title).page(params[:page]).per(5)
        render json: {
          rewards: @rewards,
          meta: {
            total_pages: @rewards.total_pages,
            current_page: @rewards.current_page,
            next_page: @rewards.next_page,
            prev_page: @rewards.prev_page,
            total_count: @rewards.total_count
          }
        }
      end

      def show
        if @reward.nil?
          render json: { error: "Reward not found" }, status: :not_found
          return
        end
        render json: @reward, status: :ok
      end

      def create
        @reward = Reward.new(reward_params)
        if @reward.save
          render json: @reward, status: :created
        else
          render json: { errors: @reward.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @reward.update(reward_params)
          render json: @reward, status: :ok
        else
          render json: { errors: @reward.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @reward.update(is_deleted: true, deleted_at: Time.current)
          head :no_content
        else
          render json: { errors: @reward.errors.full_messages }, status: :unprocessable_entity
        end          
      end

      private

      def set_reward
        @reward = Reward.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Reward not found" }, status: :not_found
      end

      def reward_params
        params.require(:reward).permit(:title, :description, :cost)
      end
    end
  end
end