function factorial(n) {
  let calculated_value;
  if (n==0 || n==1) {
    calculated_value=1;
  } else {
    calculated_value=n;
    while (n!=1) {
      n-=1;
      calculated_value *= n;
    }
  }
  return calculated_value;
}
