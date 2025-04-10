function highlight(table) {
  const tbody = table.querySelector('tbody');
  for (const row of tbody.rows) {
    const isAvailable = row.cells[3].dataset.available;
    const age = parseInt(row.cells[1].textContent.trim(), 10);
    const gender = row.cells[2].textContent.trim();
    if (isAvailable !== undefined) {
      row.classList.add(isAvailable === 'true' ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', true);
    }
    row.classList.add(gender === 'm' ? 'male' : 'female');
    if (age < 18) {
      row.style.textDecoration = 'line-through'; 
    }
  }
}