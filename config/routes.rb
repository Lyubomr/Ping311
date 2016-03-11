Rails.application.routes.draw do
  namespace :admin do
    resources :comments
resources :reports
resources :users
resources :votes

    root to: "comments#index"
  end

  # Home directory
  root :to => 'reports#index'
  resources :votes, only: [:index, :show, :create, :update, :destroy]
  # Voting routes
  resources :reports do
    resources :comments, only: [:show, :create, :destroy]
  end
  # Restful routes
  resources :sessions
  resources :users
  #Sorcery routes for users to login/logout.
  get 'login' => 'sessions#new', :as => :login
  post 'logout' => 'sessions#destroy', :as => :logout
end
