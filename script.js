
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    events: JSON.parse(localStorage.getItem('eventos') || '[]')
  });
  calendar.render();

  document.getElementById('form-agendamento').addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const sala = document.getElementById('sala').value;
    const data = document.getElementById('data').value;
    const duracao = parseInt(document.getElementById('duracao').value);
    const inicio = new Date(data);
    const fim = new Date(inicio.getTime() + duracao * 60 * 60 * 1000);

    const evento = {
      title: titulo + ' (' + sala + ')',
      start: inicio.toISOString(),
      end: fim.toISOString()
    };

    calendar.addEvent(evento);

    const eventosSalvos = JSON.parse(localStorage.getItem('eventos') || '[]');
    eventosSalvos.push(evento);
    localStorage.setItem('eventos', JSON.stringify(eventosSalvos));

    fecharModal();
    this.reset();
  });
});

function abrirModal() {
  document.getElementById('modal').style.display = 'block';
}
function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}
