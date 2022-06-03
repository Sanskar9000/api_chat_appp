class ChatroomsChannel < ApplicationCable::Channel
  def subscribed
    @chatroom = Chatroom.find(2)
    stream_for @chatroom
    message  = @chatroom.messages
    ChatroomsChannel.broadcast_to(@chatroom, {chatroom: @chatroom, users: @chatroom.users, message: message})
  end

  def received(data)
    @chatroom = Chatroom.find(2)
    message  = @chatroom.messages
    ChatroomsChannel.broadcast_to(@chatroom, {chatroom: @chatroom, users: @chatroom.users, messages: @chatroom.messages})
  end

  def speak(data)
    # ChatroomsChannel.broadcast_to(@chatroom, {chatroom: @chatroom, users: @chatroom.users, message: mes
    
    @chatroom = Chatroom.find(2)
    message  = Message.create(chatroom_id:data["chatroom_id"], user_id: data["user_id"], body:data["message"])
    # ActionCable.server.broadcast "stream_test", message: "Created successfully", chatroom: @chatroom, message: message, status: 200
    ChatroomsChannel.broadcast_to(@chatroom, {chatroom: @chatroom, users: @chatroom.users.uniq, message: message})
  end

  def unsubscribed
  end
end
