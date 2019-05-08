Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "groups#index"
  
  resources :groups ,only: [:new, :edit, :create, :update] do
    resources :comments, only: [:create, :index]
  end

  resources :users, only: [:edit, :update, :index]

end
