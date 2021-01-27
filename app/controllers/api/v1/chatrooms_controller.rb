class Api::V1::ChatroomsController < ApplicationController
  
  def index
    chatrooms = Chatroom.all
    render json: chatrooms
  end

  def create
    @chatroom = Chatroom.new(chatroom_params)

    if @chatroom.save
      add_users_to_chatroom
      
      render json: {
        chatroom: @chatroom,
        users: @chatroom.users
      }
    else
      render json: { message: 'Unable to create chatroom! Please try again.'}
    end
  end

  def show
    chatroom = Chatroom.find(params[:id])
    render json: {
      chatroom_id: chatroom.id,
      chatroom_title: chatroom.title
    }  
  end

  private

  def add_users_to_chatroom
    params[:users].each do |name|
      user = User.find_by(username: name)
      @chatroom.users << user
    end
  end
  
  def chatroom_params
    params.require(:chatroom).permit(:title)
  end
end
