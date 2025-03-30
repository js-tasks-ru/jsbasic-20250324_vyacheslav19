function truncate(str, maxlength) {
  if (str.length>maxlength){
    str = str.replace(str.substring(str.length, maxlength-1), '')+'…';
  } 
  return str;
}
