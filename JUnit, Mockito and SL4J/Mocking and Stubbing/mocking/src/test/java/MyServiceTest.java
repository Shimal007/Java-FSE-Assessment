import org.example.ExternalApi;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.example.MyService;
import org.junit.jupiter.api.Test;

public class MyServiceTest {
    @Test
    public void ServiceTest(){
        ExternalApi mockapi=mock(ExternalApi.class);
        when(mockapi.returndata()).thenReturn("Mock data");
        MyService service=new MyService(mockapi);
        String result=service.getdata();
        assertEquals("Mock data",result);
    }
}
