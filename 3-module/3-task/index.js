function camelize(str) {
  return str.split('-').map((elem,index) =>{
      if (index === 0){
          return elem;
      }
           return elem.charAt(0).toUpperCase() + elem.slice(1);
  }).join('');
}