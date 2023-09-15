//declare variables
let age=20;
let fav_num=3;
let day_of_birth=15;
let month_of_birth=3;

//define calculations
let calc1=age + fav_num / day_of_birth * month_of_birth;
let calc2=(age + fav_num) / day_of_birth * month_of_birth;

//Output calc to dom
document.getElementById("result1").innerHTML = calc1;
document.getElementById("result2").innerHTML = calc2;
