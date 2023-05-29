function calculateStats(dataArray, isMetricsTable = false) {
  let counts = {};
  let countsNumerics = {};
  let averages = {};

  dataArray.forEach(item => {
    for (let key in item) {
      // Handle differently for metrics table
      if (isMetricsTable && key === 'name') {
        if (!counts[item[key]]) counts[item[key]] = 0;
        counts[item[key]]++;
        if (!countsNumerics[item[key]]) countsNumerics[item[key]] = 0;
        countsNumerics[item[key]] += item['value'];
        if (!averages[item[key]]) averages[item[key]] = 0;
        averages[item[key]] = countsNumerics[item[key]] / counts[item[key]];
      } else if (typeof item[key] === 'number') {
        // Only perform operations on number fields
        let countKey = `Count${key}`;
        let avgKey = `Avg${key}`;
        if (!counts[countKey]) counts[countKey] = 0;
        if (!countsNumerics[key]) countsNumerics[key] = 0;
        counts[countKey]++;
        countsNumerics[key] += item[key];
        if (!averages[avgKey]) averages[avgKey] = 0;
        averages[avgKey] = countsNumerics[key] / counts[countKey];
      }
    }
  });

  // Merge all result objects
  let results = {...counts, ...averages};

  return results;
}

function draw(tables, groupingField) {
  // Group the data by the selected field
  let groupedData = {};
  for (let tableName in tables) {
    if (Array.isArray(tables[tableName])) {
      tables[tableName].forEach(item => {
        let group = item[groupingField];
        if (!groupedData[group]) {
          groupedData[group] = [];
        }
        groupedData[group].push(item);
      });
    }
  }

  // Calculate the stats for each group
  let stats = {};
  for (let group in groupedData) {
    let isMetricsTable = group === 'metrics';
    stats[group] = calculateStats(groupedData[group], isMetricsTable);
  }

  // Generate a table for each group
  for (let group in stats) {
    let tableId = `${group}Table`;
    let table = generateTable(stats[group], tableId);
    document.body.appendChild(table);
  }
}

function generateTable(dataObject, tableId) {
  const table = document.createElement('table');
  table.setAttribute('id', tableId);

  // Create the headers
  const headers = document.createElement('tr');
  for (let key in dataObject) {
    const th = document.createElement('th');
    th.textContent = key;
    headers.appendChild(th);
  }
  table.appendChild(headers);

  // Create a row for the data
  const tr = document.createElement('tr');
  for (let key in dataObject) {
    const td = document.createElement('td');
    td.textContent = dataObject[key];
    tr.appendChild(td);
  }
  table.appendChild(tr);

  return table;
}
