package FinancialForecastingRecursion;

public class Main {
    public static void main(String[] args) {
        FinancialForecasting fc = new FinancialForecasting();
        double currentBalance = 1000.0;
        int years = 10;
        double annualGrowthRate = 0.05;
        System.out.println(fc.calculateForecast(currentBalance, years, annualGrowthRate));
    }
}
