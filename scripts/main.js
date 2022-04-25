//ingresar activad y pushearlas a un array
//ordenar por tipo entrenamiento t-inferior, t-superior, core (por boton)
//ordenar por volumen de entrenamiento(por boton)
//ordenar por carga total(por boton)
let container_toma_datos = document.getElementById("container_toma_datos");
let container_muestra_ingresos = document.getElementById(
  "container_muestra_ingresos"
);

init();

function init() {
  let registros_core = [];

  menu_principal();

  //declaraciones

  function menu_principal() {
    //botones de entrenamiento

    let boton_ingreso_core = document.createElement("button");
    boton_ingreso_core.innerHTML = `<h3>Nuevo Entrenamiento</h3>`;
    boton_ingreso_core.setAttribute("class", "boton");

    //botones de accion, y orden
    let boton_vista_entrenamiento = document.createElement("button");
    boton_vista_entrenamiento.innerHTML = `<h3>Mostrar entrenamientos en cola</h3>`;
    boton_vista_entrenamiento.setAttribute("class", "boton");

    let boton_subir_actividad = document.createElement("button");
    boton_subir_actividad.innerHTML = `<h3>Guardar entrenamientos en la nube</h3>`;
    boton_subir_actividad.setAttribute("class", "boton");

    let boton_estadisticas = document.createElement("button");
    boton_estadisticas.innerHTML = `<h3>Estadísticas</h3>`;
    boton_estadisticas.setAttribute("class", "boton");


    container_toma_datos.append(
      boton_ingreso_core,
      boton_vista_entrenamiento,
      boton_subir_actividad,
      boton_estadisticas,
    );

    //eventos botones
    boton_ingreso_core.addEventListener("click", formulariocore);
    boton_vista_entrenamiento.addEventListener("click", mostrar_entrenamiento);
    boton_subir_actividad.addEventListener("click", subir_actividad);
    boton_estadisticas.addEventListener("click",resumen_del_usuario);
  }

  function formulariocore() {
    container_muestra_ingresos.innerHTML = "";
    let contenedor_formulario = document.createElement("div");
    container_muestra_ingresos.append(contenedor_formulario);
    contenedor_formulario.setAttribute("class", "formulario_entrada");

    let formulario = document.createElement("form");
    formulario.innerHTML = `
        <h2>Detalle su entrenamiento de core</h2>
        <label for="identificacion">Nombre del entrenamiento: <input id="identificacion" type="text"></input></label>
        <label for="dia">Día de la semana: <input type="text" id="dia"></input></label>
        <label for="volumen">Volumen del entrenamiento (en hs):<input id="volumen" type="number"></input></label>
        <label for="carga">Carga neta del entrenamiento: <input id="carga" type="number"></input></label>
        <button type="submit" id="submit">Enviar</button>`;
    contenedor_formulario.append(formulario);

    //envio
    formulario.addEventListener("submit", envio);

    function envio(e) {
      e.preventDefault();
      let valor_dia = document.getElementById("dia").value;
      let valor_vol = Number(document.getElementById("volumen").value);
      let valor_carga = Number(document.getElementById("carga").value);
      let identificacion = document.getElementById("identificacion").value;

      registros_core.push({
        id: identificacion,
        dia: valor_dia,
        volumen: valor_vol,
        carga: valor_carga,
      });
      console.log(registros_core);

      Toastify({
        text: "Entrenamiento Completado.",
        duration: 1500,
        newWindow: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #40916c, #74c69d)",
        },
      }).showToast();
      formulario.innerHTML = "";
    }
  }

  function mostrar_entrenamiento() {
    container_muestra_ingresos.innerHTML = "";
    let contenedor_entrenamientos = document.createElement("div");
    container_muestra_ingresos.append(contenedor_entrenamientos);

    let caja_contenedora_datos = document.createElement("div");
    caja_contenedora_datos.setAttribute("id", "contenedor");
    contenedor_entrenamientos.append(caja_contenedora_datos);
    caja_contenedora_datos.innerHTML = "";

    
    if (registros_core.length == 0) {
      if (document.getElementById("contenedor").children.length < 1) {
        caja_contenedora_datos.innerHTML = `<h2>No hay datos Cargados</h2>`;
      }
    } else {
      for (registro of registros_core) {
        
        //registros impresos
        let caja_contenedora_datos = document.createElement("div");
        contenedor_entrenamientos.append(caja_contenedora_datos);
        let id = document.createElement("h4");
        id.innerHTML = `Id del entrenamiento: ${registro.id}`;
        let dia = document.createElement("h4");
        dia.innerHTML = `Día de entrenamiento: ${registro.dia}`;
        let volumen = document.createElement("h4");
        volumen.innerHTML = `Volumen de su entrenamiento: ${registro.volumen}hs`;
        let carga = document.createElement("h4");
        carga.innerHTML = `Carga en kg de su entrenamiento:  ${registro.carga}`;

        //borrar actividad
        let borrar = document.createElement("button");
        borrar.setAttribute("id", registros_core.indexOf(registro));
        borrar.innerText = `Borrar esta actividad`;
        borrar.addEventListener("click", borrar_actividad);

        //append
        caja_contenedora_datos.append(id, dia, volumen, carga);
        caja_contenedora_datos.append(borrar);

        //funcion

        function borrar_actividad(e) {
          
          let objetivo = e.target.id;
          registros_core.splice(objetivo, 1);
          caja_contenedora_datos.innerHTML = "";
          Toastify({
            text: "Entrenamiento Eliminado.",
            duration: 1500,
            newWindow: true,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient(to right, #40916c, #74c69d)",
            },
          }).showToast();
        }
      }

              //limpiar panel
              function limpiar(){
                
                container_muestra_ingresos.innerHTML="";

              }

              //boton limpiar
              let boton_limpiar = document.createElement("button");
              boton_limpiar.setAttribute("id", "btnLimpiar");
              container_muestra_ingresos.append(boton_limpiar);
              boton_limpiar.innerHTML = `<h3>Limpiar ventana</h3>`;
              boton_limpiar.addEventListener("click", limpiar);

    }
    //mostrar actividades
  }

  function subir_actividad() {
    let ventana_subida = document.createElement("div");
    container_toma_datos.append(ventana_subida);
      Toastify({
        text: "¡Actividades subidas correctamente!",
        duration: 2000,
        newWindow: true,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #40916c, #74c69d)",
        },
      }).showToast();
      let string_registros = JSON.stringify(registros_core);
    localStorage.setItem("entrenamientos", string_registros);

    registros_core.length >2 ? swal({title:"¡Estas avanzando en tu objetivo a largo plazo!",text:"Continua para ver la mejor versión de ti mismo.", icon:"success"}) : swal({title:"Intenta mejorar", text:"Recuerda encontrar cosas que disfrutes de tu entrenamiento, haz amigos durante tus entrenamientos, e intenta definir un buen horario. De esta manera vas a trabajar mejor tu disciplina", icon:"info"});
    }

  

  function recupera() {
      let recuperarLS = JSON.parse(localStorage.getItem('entrenamientos')) || []

      recuperarLS.forEach(elemento => {
          registros_core.push(elemento)
      });
  }

  recupera()

  //funcion comparativa cargas
    registros_core.sort((a,b)=>{
      if (a.carga<-b.carga){
        return -1;
      }
    });

    // funcion impresion de entrenamiento x carga



  function resumen_del_usuario(){
    let container_analisis_datos = document.getElementById("container_analisis_datos");
    
    container_analisis_datos.innerHTML=`<h2 class ="titulo_analisis">Estadisticas de tus entrenamientos</h2>
    <h4 class="total_analisis">El total de entrenamientos hasta el momento es de: ${registros_core.length}</h4><br>
    <h3 class="titulo_orden_carga">Tus mejores entrenamientos segun la carga: </h3>`;


    impresion_mejores_entrenamiento();


    //funcion de recorrido e impresoon x mejor entrenamiento
    function impresion_mejores_entrenamiento(){
      for(x of registros_core){
        let orden_e_impresion =document.createElement("div");
        orden_e_impresion.setAttribute("class","resultados" )
        container_analisis_datos.append(orden_e_impresion);

        orden_e_impresion.innerHTML=`<h4>Entrenamiento: ${x.id},</h4><br>
        <h4>Día del entrenamiento: ${x.dia}</h4><br>
        <h4>Tu carga fue de ${x.carga}kgs.
        `;
        
      }
    }
  }
}