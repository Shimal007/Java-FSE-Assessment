import org.example.Calculator;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    Calculator c;
    @BeforeEach
    void setup(){
        System.out.println("Creating Constructor Object");
        c=new Calculator();
    }
    @Test
    void testadd(){
        int a=2;
        int b=5;

        int result=c.add(a,b);

        assertEquals(7,result);
    }
    @AfterEach
    void teardown(){
        System.out.println("TearDown: Test Completed");
    }
}
