/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = []
  elem = null;
  constructor(rows) {
    this.#rows = rows || this.#rows;
    this.#render();
  }
  #render() {
    this.elem = createElement(this.#template());
    this.elem.addEventListener('click', this.#onDeleteClick.bind(this)); 
  }
  #template() {
 let html=` 
  <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>`;
        this.#rows.forEach(row => {
      html+=
      `<tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button data-button="delete">X</button></td>
        </tr>
      `
        })
        html += `</tbody></table>`;
        return html;
   }
   #onDeleteClick(event) {
    if (event.target.dataset.button === 'delete') { 
        const row = event.target.closest('tr'); 
        if (row) {
            row.remove();
        }
    }
 }
}

function createElement(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstElementChild;
}

