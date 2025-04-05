function sumSalary(salaries) {
  let sum_number = 0;
  for (let key in salaries)
  {
      if (Number(salaries[key]) && salaries[key]!=Infinity  && salaries[key]!=-Infinity){
   sum_number+=salaries[key];
      }
  }
  return sum_number;
  
};