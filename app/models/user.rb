class User < ApplicationRecord
  has_secure_password
  has_many :messages, dependent: :destroy
  has_many :chatrooms, through: :messages
  has_many :sent_messages, :class_name => 'PrivateMessage', :foreign_key => 'sender_id'
  has_many :received_messages, :class_name => 'PrivateMessage', :foreign_key => 'receiver_id'

  validates :username, :password, presence: true
  validates :username, uniqueness: true
end
