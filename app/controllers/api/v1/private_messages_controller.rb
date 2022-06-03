class Api::V1::PrivateMessagesController < ApplicationController

  before_action :authenticate_user

  def index
    current_user= @user
    chat_with_user = User.find(params[:chat_with_user]) rescue nil
    return render json:{error: "User not found!" } if !chat_with_user
    if params[:chat_with_user].to_i != current_user.id
      current_user_messages = current_user.received_messages.or(current_user.sent_messages)
      private_chat = current_user_messages.where(sender_id:params[:chat_with_user]).or(current_user_messages.where(receiver_id:params[:chat_with_user]))
      render json: {messages: private_chat, chating_with_user: User.find(params[:chat_with_user])}
    else
      render json: {error: "User does not have chat with themselves!"}
    end
  end

  def create
    current_user= @user
    return render json:{error: "please pass chat_with_user id" } if !params[:chat_with_user].present?
    chat_with_user = User.find(params[:chat_with_user]) rescue nil
    return render json:{error: "User not found!" } if !chat_with_user
    message = PrivateMessage.create(body: params[:body], receiver_id: params[:chat_with_user], sender_id: current_user.id)
    current_user_messages = current_user.received_messages.or(current_user.sent_messages)
    private_chat = current_user_messages.where(sender_id:params[:chat_with_user]).or(current_user_messages.where(receiver_id:params[:chat_with_user]))
    render json: {messages: private_chat, chating_with_user: User.find(params[:chat_with_user])}
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

  def authenticate_user
    # decoded_token = decode(request.headers['token'])
    # @user = User.find(decoded_token["user_id"])
    @user = User.find(1)
    render json: { message: 'Un-Authenticated Request', authenticated: false } unless @user
  end

end
