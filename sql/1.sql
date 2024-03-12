-- Active: 1707660288963@@127.0.0.1@3306@school
select student_gender, count(student_id) as count from student group by student_gender

select student_id,student_name, 0 as attendance from student

select student_id,student_gender, 0 as attendance from student where student_gender='male' LIMIT 100