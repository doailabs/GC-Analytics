function generateTable(dataArray, tableId) {
  const table = document.createElement('table');
  table.setAttribute('id', tableId);

  dataArray.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.setAttribute('id', `row-${i}`);
    Object.values(item).forEach(val => {
      const td = document.createElement('td');
      td.textContent = val;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  return table;
}

function calculateStats(dataArray) {
  let counts = {};
  let sums = {};
  let averages = {};

  dataArray.forEach(item => {
    for (let key in item) {
      // Only perform operations on number fields
      if (typeof item[key] === 'number') {
        if (!counts[key]) counts[key] = 0;
        if (!sums[key]) sums[key] = 0;
        counts[key]++;
        sums[key] += item[key];
        averages[key] = sums[key] / counts[key];
      }
    }
  });

  return {
    'Count': counts,
    'Sum': sums,
    'Avg': averages
  };
}

function draw(tables, groupingField) {
  // Merge all tables into a single array
  let allData = [].concat.apply([], Object.values(tables).filter(Array.isArray));
  // Group the data by the selected field
  let groupedData = allData.reduce((groups, item) => {
    let group = item[groupingField];
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {});

  // Calculate the stats for each group
  let stats = {};
  for (let group in groupedData) {
    stats[group] = calculateStats(groupedData[group]);
  }

  // Generate a table for each group
  for (let group in stats) {
    let tableId = `${group}Table`;
    let table = generateTable(stats[group], tableId);
    document.body.appendChild(table);
  }
}
