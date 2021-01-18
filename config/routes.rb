Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      post '/login', to: 'auth#create'
      resources :chatrooms
      resources :messages, only: [:index, :create]
      resources :users, only: [:create]
      resources :chatrooms, only: [:index, :create, :show]
    end
  end
  mount ActionCable.server => './cable' 
end
