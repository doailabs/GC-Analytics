function drawStats(groupedData, groupByField) {
  // Clear previous results
  clearResults();

  for (let group in groupedData) {
    let dataArray = groupedData[group];
    let stats = calculateStats(dataArray);
    displayStats(group, groupByField, stats);
  }
}

function clearResults() {
  // Clear previous results
  document.getElementById('results').innerHTML = '';
}

function calculateStats(dataArray) {
  let counts = {};
  let sums = {};

  dataArray.forEach(item => {
    for (let key in item) {
      if (typeof item[key] === 'number') {
        if (!counts[key]) counts[key] = 0;
        if (!sums[key]) sums[key] = 0;

        counts[key]++;
        sums[key] += item[key];
      }
    }
  });

  let avgs = {};
  for (let key in counts) {
    avgs[key] = sums[key] / counts[key];
  }

  return {counts: counts, avgs: avgs};
}

function displayStats(group, groupByField, stats) {
  let resultsDiv = document.getElementById('results');

  let groupDiv = document.createElement('div');
  groupDiv.textContent = `${groupByField}: ${group}`;

  let statsDiv = document.createElement('div');
  statsDiv.textContent = JSON.stringify(stats, null, 2);

  resultsDiv.appendChild(groupDiv);
  resultsDiv.appendChild(statsDiv);
}
