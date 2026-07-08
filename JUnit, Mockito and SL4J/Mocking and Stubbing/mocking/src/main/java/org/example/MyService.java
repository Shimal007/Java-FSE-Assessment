package org.example;

public class MyService {
    ExternalApi api;
    public MyService(ExternalApi api){
        this.api=api;
    }
    public String getdata(){
        return api.returndata();
    }
}
