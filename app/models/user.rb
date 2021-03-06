class User < ActiveRecord::Base
  authenticates_with_sorcery!
  has_many :comments
  has_many :votes
  has_many :voted_reports, through: :votes, :source => :report

  has_many :subscriptions
  has_many :subscribed_reports, through: :subscriptions, :source => :report

  # Act as voter is an association supplied by act_as_votable gem to be applied on?
  # whoever can vote.?
  # Validations through sorcery. Not sure about code within {}
  # The password length to be a minimum of 4 character,
  validates :password, length: { minimum: 4 }, if: -> { new_record? || changes["password"] }
  validates :password, confirmation: true, if: -> { new_record? || changes["password"] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes["password"] }
  validates :email, uniqueness: true
end
