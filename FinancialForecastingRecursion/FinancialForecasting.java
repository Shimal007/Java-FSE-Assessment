package FinancialForecastingRecursion;

class FinancialForecasting {
    public double calculateForecast(double currentBalance, int years, double annualGrowthRate) {
        if (years <= 0) {
            return currentBalance;
        }
        return calculateForecast(currentBalance, years - 1, annualGrowthRate) * (1 + annualGrowthRate);
    }
}