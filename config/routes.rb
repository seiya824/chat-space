Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "groups#index"
  
  resources :groups ,only: [:new, :edit, :create, :update] do
    resources :comments, only: [:create, :index]
  end
  get "/user" => "users#index"
  # indexのルートがうまく行かないので追加
  resource :user, only: [:edit, :update]

end
