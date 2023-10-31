

export default function Sort(data, rules) {

  data.sort((a, b) => {
    for (let i = 0; i < rules.length; i++) {
      const field = rules[i].field;
      const sort = rules[i].sort;

      if (sort === 'asc') {
        if (a[field] > b[field]) return 1;
        if (a[field] < b[field]) return -1;
      } else {
        if (a[field] > b[field]) return -1;
        if (a[field] < b[field]) return 1;
      }
    }
  })

  return data;
}