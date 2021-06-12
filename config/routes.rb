Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#create'
      resources :messages, only: [:index, :create]
      resources :users, only: [:index, :create]
      resources :chatrooms, only: [:index, :create, :show]
    end
  end

  get '*path', to: 'application#frontend_path', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }

  mount ActionCable.server => './cable' 
end
