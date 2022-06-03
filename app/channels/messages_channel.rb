class MessagesChannel < ApplicationCable::Channel
  def subscribed
    chatroom = Chatroom.find(2)
    stream_for chatroom
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
