declare 
cursor c is select customerid,loanid,duedate from LOANS where duedate between sysdate and sysdate+30;
begin
    for customer in c LOOP
    dbms_output.put_line(customer.customerid||customer.loanid||customer.duedate);
    end loop;
    commit;
    end;
    /
