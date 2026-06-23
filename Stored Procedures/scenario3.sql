create or replace procedure TransferFunds(f_acc number,to_acc number,money number) IS
c_bal number;
begin
    select balance into c_bal from accounts where accountId=f_acc;
    if c_bal>=money then update accounts set balance=balance-money where accountid=f_acc;
    update accounts set balance=balance+money where accountid=to_acc;
    dbms_output.put_line('balance updated');
    ELSE
        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');
    end if;
    commit;
    end;
    /
exec TRANSFERFUNDS(1,2,500);