module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: [:show , :destroy, :redemptions]

      def index
        @users = User.active.order(:name)        
        render json: @users, status: :ok
      end

      def show
        @user = User.find(params[:id])
        render json: @user, status: :ok
      end

      def create
        @user = User.new(user_params)
        if @user.save
          render json: @user, status: :created
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @user
          if @user.soft_delete
            head :no_content
          else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
          end          
        else
          render json: { error: 'User not found' }, status: :not_found
        end

      end

      def redemptions
        @redemptions = Redemption.by_user(@user.id).recent.page(params[:page]).per(5)
        render json: {
          redemptions: @redemptions.as_json(include: {reward: { only: [:title] }}),
          meta: {
            total_pages: @redemptions.total_pages,
            current_page: @redemptions.current_page,
            next_page: @redemptions.next_page,
            prev_page: @redemptions.prev_page,
            total_count: @redemptions.total_count
          }
        }
      end

      private

      def set_user
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "User not found" }, status: :not_found
      end

      def user_params
        params.require(:user).permit(:name, :email)
      end
    end
  end
end