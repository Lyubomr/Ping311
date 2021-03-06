class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :report

  validates :user_id, :uniqueness => { :scope => :report_id }
  # one subscription per user per report
end
