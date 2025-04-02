function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
let schedule = {};
isEmpty(schedule);
schedule["8:30"] = "подъём";
isEmpty(schedule);