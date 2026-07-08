create or replace procedure UpdateEmployeeBonus (p_dept IN varchar2,bonus in number) is
BEGIN
    update employees set salary=salary+(salary*bonus/100) where department=p_dept;
    dbms_output.put_line('salary updated');
    commit;
    end;
    /
EXEC UpdateEmployeeBonus('IT',10);