class ReportsController < ApplicationController
  def new
    @report = Report.new
  end

  def create
    @report = Report.new(report_params)
    # When report is created the status is automatically set to 0 (pending >> goes to admin for verification)
    #@report.status = @status
    #@status = 1
    @report.status = 1
    if @report.save
      redirect_to report_path(@report)
    else
      render :new
    end
  end

  def index
    @reports = Report.all
  end

  def show
    @report = Report.find(params[:id])
  end

  def destroy
    @report = Report.find(report_params[:id])
    @report.destroy
      redirect_to reports_path
  end

private
def report_params
  params.require(:report).permit(:id, :description, :address, :status)
end

end