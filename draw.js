function generateTable(dataArray, tableId) {
  const table = document.createElement('table');
  table.setAttribute('id', tableId);
  
  dataArray.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.setAttribute('id', `row-${i}`);
    tr.setAttribute('draggable', 'true');
    for (const key in item) {
      const td = document.createElement('td');
      td.textContent = item[key];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  });

  return table;
}

// This function initializes the Dragula library on a given table
function enableDragAndDrop(tableId) {
  const container = document.getElementById(tableId);
  const drake = dragula([container]);
  
  drake.on('drop', function(el, target, source, sibling) {
    // You can add logic here to handle the drop event, such as updating your data array
  });
}

// The main draw function, which generates a table and enables drag and drop
function draw(data) {
  const tableId = 'analyticsTable';
  const table = generateTable(data, tableId);
  document.body.appendChild(table);
  enableDragAndDrop(tableId);
}

