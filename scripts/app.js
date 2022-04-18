let dia = new Date();
let nro = dia.getDay() - 1;
let semana = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

let gruposm = [
  "Full body",
  "Pierna",
  "Pecho",
  "Hombro",
  "Espalda",
  "Bíceps",
  "Tríceps",
  "Antebrazo",
  "Abdominales",
];

let color = [
  "light",
  "secondary",
  "dark",
  "primary",
  "info",
  "success",
  "warning",
  "danger",
  "light",
];

let diaDeLaSemana = document.querySelector("#container");
diaDeLaSemana.innerHTML = `<h4>${
  semana[nro]
}</h4>`;

rutinas.forEach((element) => {
  if (element.dia == nro + 1) {
    let grupo = parseInt(element.tipo) - 1;
    let lista = document.createElement("tr");
    lista.innerHTML += `
    <td><img src="https://onclickwebdesign.com/wp-content/uploads/stopwatch.png" alt="Stopwatch" /></td>
                <td>${gruposm[grupo]}</td>
                <td>${element.rutina}</td>
    `;
    document.getElementById("lista").appendChild(lista);
  }
});
