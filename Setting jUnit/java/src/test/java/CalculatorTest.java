import org.example.Calculator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {
    @Test
    void testadd(){
        Calculator cal=new Calculator();
        System.out.println(cal.add(4,5));
        assertEquals(11,cal.add(4,4));
    }
}
