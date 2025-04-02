function sumSalary(salaries) {
  let sum_number = 0;
  for (let key in salaries)
  {
      if (Number(salaries[key]) && salaries[key]!=Infinity  && salaries[key]!=-Infinity){
   sum_number+=salaries[key];
      }
  }
  return sum_number;
  
}
let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
}
sumSalary(salaries);