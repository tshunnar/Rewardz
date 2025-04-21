module Api
  module V1
    class RedemptionsController < ApplicationController
      before_action :set_redemption, only: [:show, :update, :destroy]

      def index
        @redemptions = Redemption.recent.page(params[:page]).per(5)
        render json: {
          redemptions: @redemptions,
          meta: {
            total_pages: @redemptions.total_pages,
            current_page: @redemptions.current_page,
            next_page: @redemptions.next_page,
            prev_page: @redemptions.prev_page,
            total_count: @redemptions.total_count
          }
        }
      end

      def show
        if @redemption.nil?
          render json: { error: "Redemption not found" }, status: :not_found
          return
        end
        render json: @redemption, status: :ok
      end

      def create
        @redemption = Redemption.new(redemption_params)
        if @redemption.save
          render json: @redemption, status: :created
        else
          render json: { errors: @redemption.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @redemption.update(redemption_params)
          render json: @redemption, status: :ok
        else
          render json: { errors: @redemption.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @redemption.destroy
        head :no_content
      end

      private

      def set_redemption
        @redemption = Redemption.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Redemption not found" }, status: :not_found
      end

      def redemption_params
        params.require(:redemption).permit(:user_id, :reward_id)
      end
    end
  end
end
