DECLARE 
Cursor c IS select CustomerId,Age from Customers;
BEGIN
    for customer in c loop
    if customer.age>60 then 
    update loans set interestrate=interestrate-1
    where customer.CustomerId=CustomerId;
    DBMS_OUTPUT.PUT_LINE('Discount applied for Customer ID: ' ||customer.CustomerID);
    end if;
    end loop;
    commit;
    end;
    /
/;
