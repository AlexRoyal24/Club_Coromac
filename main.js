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
    let fechaA = new Date(hoy.getFullYear(), new Date(a.fecha).getMonth(), new Date(a.fecha).getDate());
    let fechaB = new Date(hoy.getFullYear(), new Date(b.fecha).getMonth(), new Date(b.fecha).getDate());
    return fechaA - fechaB;
  });

  cumplesOrdenados.forEach((c, index) => {
    let li = document.createElement("li");
    li.textContent = `${c.nombre} - ${new Date(c.fecha).toLocaleDateString()}`;

    // Botón borrar
    let btnBorrar = document.createElement("button");
    btnBorrar.textContent = "❌";
    btnBorrar.onclick = () => eliminarCumple(index);

    li.appendChild(btnBorrar);
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
