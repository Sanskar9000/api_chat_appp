class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_user

  def create
    message = @user.messages.new(message_params)
    
    if message.save
      chatroom = message.chatroom
      @chatroom = message.chatroom
      message  = @chatroom.messages.last if @chatroom.messages
      ChatroomsChannel.broadcast_to(@chatroom, {chatroom: @chatroom, users: @chatroom.users.uniq, message: message})
      # ChatroomsChannel.broadcast_to(chatroom, {chatroom: chatroom,users: chatroom.users,messages: chatroom.messages})
    end
    render json: message
  end

  def index
    message = @user.messages.last
    
    if message
      chatroom = message.chatroom
      @chatroom = message.chatroom
      message  = @chatroom.messages.last if @chatroom.messages
      render json: {chatroom: @chatroom, users: @chatroom.users.uniq, message: message}

    end
  end

  private

  def message_params
      params.require(:message).permit(:body, :chatroom_id)
  end

  def authenticate_user
    @user = User.find(1)
    render json: { message: 'Un-Authenticated Request', authenticated: false } unless @user
  end
end