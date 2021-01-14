class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :title, :users, :messages
end
