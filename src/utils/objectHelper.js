export const getValue = (obj, key) => {
  if (!obj) return;
  key = Array.isArray(key) ? key : key.split('.');
  obj = obj[key[0]];
  if (obj && key.length > 1) {
    return getValue(obj, key.slice(1));
  }
  return obj;
};

export const groupBy = (arr, key) => {
  return arr.reduce((result, obj) => {
    (result[obj[key]] = result[obj[key]] || []).push(obj);
    return result;
  }, {});
};

export const getUniqData = (arr) => {
  const jsonData = arr.map(JSON.stringify);
  const uniqueSet = new Set(jsonData);
  return Array.from(uniqueSet).map(JSON.parse);
};

export const filterWithConditions = (arr, conditions) =>
  arr.filter((item) =>
    conditions.every(({ id, operator, value }) => {
      switch (operator) {
        case 'CONTAINS':
          return item[id].toLowerCase().indexOf(value.toLowerCase()) > -1;
        case 'GTE':
          return item[id] >= value;
        case 'LTE':
          return item[id] <= value;
        case 'EQ':
          return item[id].toString() === value.toString();
        default:
          return false;
      }
    })
  );
