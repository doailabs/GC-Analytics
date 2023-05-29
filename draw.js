function generateTable(dataArray, tableId) {
  const table = document.createElement('table');
  table.setAttribute('id', tableId);
  
  dataArray.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.setAttribute('id', `row-${i}`);
    for (const key in item) {
      const td = document.createElement('td');
      td.textContent = item[key];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  });

  return table;
}

// This function initializes the Dragula library on a given container
function enableDragAndDrop(containerId) {
  const container = document.getElementById(containerId);
  const drake = dragula([container]);
  
  drake.on('drop', function(el, target, source, sibling) {
    // You can add logic here to handle the drop event, such as updating your data array
  });
}

// The main draw function, which generates a table and enables drag and drop
function draw(data) {
  const containerId = 'analyticsContainer';
  const tableId = 'analyticsTable';
  const container = document.createElement('div');
  container.setAttribute('id', containerId);
  const table = generateTable(data, tableId);
  container.appendChild(table);
  document.body.appendChild(container);
  enableDragAndDrop(containerId);
}
