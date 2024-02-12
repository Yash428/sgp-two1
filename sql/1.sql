select *from student;
--30 is max cap
select DISTINCT student_class from student where 30>(SELECT count(student_id) from student where student_class='9-A' );