create or replace procedure ProcessMonthlyInterest is
BEGIN
    update accounts set balance=balance+balance*0.1 where accounttype='savings';
    dbms_output.put_line('balance updated');
    commit;
    end;
/
exec ProcessMonthlyInterest;