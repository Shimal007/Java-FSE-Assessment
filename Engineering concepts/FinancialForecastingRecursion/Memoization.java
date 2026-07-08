package FinancialForecastingRecursion;

import java.util.*;

public class Memoization {
    public static HashMap<Integer, Double> hm = new HashMap<>();

    public static double optimize(double cv, int y, double gr) {
        if (y == 0) {
            return cv;
        }
        if (hm.containsKey(y)) {
            return hm.get(y);
        }
        double res = optimize(cv, y - 1, gr) * (1 + gr);
        hm.put(y, res);
        return res;
    }
}
