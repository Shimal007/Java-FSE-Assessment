import org.example.ExternalApi;
import org.example.MyService;
import org.junit.jupiter.api.Test;

import org.mockito.InOrder;

import static org.mockito.Mockito.*;

public class MyServiceTest {

    @Test
    public void verifyMethodOrder() {
        ExternalApi mockApi = mock(ExternalApi.class);
        MyService service = new MyService(mockApi);
        service.fetchData();
        InOrder inOrder = inOrder(mockApi);
        inOrder.verify(mockApi).connect();
        inOrder.verify(mockApi).getData();


    }
}