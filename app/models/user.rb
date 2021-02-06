class User < ApplicationRecord
  has_secure_password
  has_many :messages, dependent: :destroy
  has_many :chatrooms, through: :messages

  validates :username, :password, presence: true
  validates :username, uniqueness: true
end
