// Recuperar cumpleaños guardados
let cumpleanios = JSON.parse(localStorage.getItem("cumples")) || [];

// Configuración de recordatorio en días antes
const diasAntesRecordatorio = 1; // Cambia a 1, 2, 3 según quieras

function mostrarCumples() {
  let lista = document.getElementById("listaCumples");
  lista.innerHTML = "";

  // Ordenar por fecha próxima
  let hoy = new Date();
  let cumplesOrdenados = cumpleanios.slice().sort((a, b) => {
    let [anoA, mesA, diaA] = a.fecha.split("-").map(Number);
    let [anoB, mesB, diaB] = b.fecha.split("-").map(Number);
    let fechaA = new Date(hoy.getFullYear(), mesA - 1, diaA);
    let fechaB = new Date(hoy.getFullYear(), mesB - 1, diaB);
    return fechaA - fechaB;
  });

  cumplesOrdenados.forEach((c, index) => {
    let li = document.createElement("li");

    // Mostrar fecha sin modificación
    let texto = document.createElement("span");
    texto.textContent = `${c.nombre} - ${c.fecha.split("-").reverse().join("/")}`;
    li.appendChild(texto);

    // Contenedor para botones
    let botones = document.createElement("span");
    botones.style.marginLeft = "10px";
    botones.style.display = "inline-flex";
    botones.style.gap = "5px";

    // Botón eliminar
    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarCumple(index);
    botones.appendChild(btnEliminar);

    // Botón Google Calendar (sin error de fecha)
    const [ano, mes, dia] = c.fecha.split("-");
    const start = `${ano}${mes}${dia}`;
    const end = `${ano}${mes}${dia}`;

    const detalles = `Cumpleaños de ${c.nombre}. Recordatorio: ${diasAntesRecordatorio} día(s) antes.`;
    let btnGC = document.createElement("a");
    btnGC.href = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(c.nombre)}&dates=${start}/${end}&details=${encodeURIComponent(detalles)}&recur=RRULE:FREQ=YEARLY&trp=true`;
    btnGC.target = "_blank";
    btnGC.textContent = "🎉 Google Calendar";

    botones.appendChild(btnGC);

    li.appendChild(botones);
    lista.appendChild(li);
  });
}

function agregarCumple() {
  let nombre = document.getElementById("nombre").value;
  let fecha = document.getElementById("fecha").value;

  if (!nombre || !fecha) {
    alert("Por favor llena todos los campos.");
    return;
  }

  cumpleanios.push({ nombre, fecha });
  localStorage.setItem("cumples", JSON.stringify(cumpleanios));
  mostrarCumples();

  document.getElementById("nombre").value = "";
  document.getElementById("fecha").value = "";
}

function eliminarCumple(index) {
  cumpleanios.splice(index, 1);
  localStorage.setItem("cumples", JSON.stringify(cumpleanios));
  mostrarCumples();
}

// Formulario submit
document.getElementById("cumpleForm").addEventListener("submit", function(e) {
  e.preventDefault();
  agregarCumple();
});

// Mostrar al cargar
mostrarCumples();
