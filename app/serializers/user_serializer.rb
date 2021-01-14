class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :messages, :chatrooms
end
