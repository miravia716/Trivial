const preguntas = [
  {
    pregunta: "¿Cuál es la capital de Francia?",
    opciones: { A: "París", B: "Madrid", C: "Roma", D: "Berlín" },
    correcta: "A"
  },
  {
    pregunta: "¿Qué órgano se inflama con la diverticulitis?",
    opciones: { A: "Hígado", B: "Intestino grueso", C: "Riñón", D: "Estómago" },
    correcta: "B"
  }
];

let tiempo = 360; // 6 minutos
let intervalo;
let preguntaActual;

function iniciarTemporizador() {
  intervalo = setInterval(() => {
    tiempo--;
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    document.getElementById("timer").textContent = \`Tiempo restante: \${minutos}:\${segundos.toString().padStart(2, "0")}\`;
    if (tiempo <= 0) {
      clearInterval(intervalo);
      document.getElementById("game").innerHTML = "<h2>¡Tiempo agotado!</h2>";
    }
  }, 1000);
}

function cargarPregunta() {
  const randomIndex = Math.floor(Math.random() * preguntas.length);
  preguntaActual = preguntas[randomIndex];
  document.getElementById("question").textContent = preguntaActual.pregunta;
  for (const key in preguntaActual.opciones) {
    const btn = document.getElementById(key);
    btn.textContent = \`\${key}: \${preguntaActual.opciones[key]}\`;
    btn.className = "option-btn";
    btn.disabled = false;
  }
  document.getElementById("result").textContent = "";
}

function responder(opcion) {
  const correcta = preguntaActual.correcta;
  document.getElementById(opcion).classList.add(opcion === correcta ? "correct" : "incorrect");
  document.getElementById(correcta).classList.add("correct");

  document.getElementById("acierto").pause();
  document.getElementById("error").pause();
  document.getElementById(opcion === correcta ? "acierto" : "error").play();

  for (const key in preguntaActual.opciones) {
    document.getElementById(key).disabled = true;
  }

  document.getElementById("result").textContent = opcion === correcta ? "¡Correcto!" : "Incorrecto";
  setTimeout(cargarPregunta, 3000);
}

document.querySelectorAll(".option-btn").forEach(btn => {
  btn.addEventListener("click", () => responder(btn.id));
});

iniciarTemporizador();
cargarPregunta();
