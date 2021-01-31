class Api::V1::MessagesController < ApplicationController
  def index
    messages = Message.all
    render json: messages
  end

  def create
    message = Message.new(message_params)
    chatroom = Chatroom.find(message_params[:chatroom_id])
    if message.save
        ChatroomsChannel.broadcast_to(chatroom, {
            chatroom: chatroom,
            users: chatroom.users,
            messages: chatroom.messages
        })
    end
    render json: message
  end

  private

  def message_params
      params.require(:message).permit(:body, :user_id, :chatroom_id)
  end
end