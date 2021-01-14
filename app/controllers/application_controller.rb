
class ApplicationController < ActionController::API
  
  def encode(payload)
    JsonWebToken.encode(payload)
  end

  def decode(token)
    JsonWebToken.decode(token)
  end
end
