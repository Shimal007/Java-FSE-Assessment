Declare cursor c is select CustomerId,Balance from customers;
Begin 
    For customer in c loop
    if customer.balance >10000 then
    update CUSTOMERS set isvip='TRUE' where customerId=customer.customerId;
    DBMS_OUTPUT.PUT_LINE('VIP status granted to Customer ID: ' ||customer.CustomerID);
    end if;
    end loop;
    commit;
    end;
    /
