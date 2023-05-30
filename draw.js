function calculateStats(dataArray) {
  let counts = {};
  let sums = {};

  dataArray.forEach(item => {
    for (let key in item) {
      if (typeof item[key] === 'number') {
        // Perform operations on numeric fields
        let countKey = `Count${key}`;
        let sumKey = `Sum${key}`;
        if (!counts[countKey]) counts[countKey] = 0;
        if (!sums[sumKey]) sums[sumKey] = 0;
        counts[countKey]++;
        sums[sumKey] += item[key];
      }
    }
  });

  // Calculate averages based on counts and sums
  let averages = {};
  for (let key in counts) {
    let avgKey = `Avg${key.substring(5)}`;  // Remove 'Count' from the start of the key
    averages[avgKey] = sums[`Sum${key.substring(5)}`] / counts[key];
  }

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
