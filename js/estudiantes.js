let listaEstudiantes = [];

const objEstudiante ={
    id: '',
    nombre: '',
    grado: '',
    grupo: '',
    turno: '',
    fecha: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const gradoImput = document.querySelector('#grado');
const grupoImput = document.querySelector('#grupo');
const turnoImput = document.querySelector('#turno');
const fechaImput = document.querySelector('#fecha');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreImput.value === '' || gradoImput.value === '' || grupoImput.value === '' || turnoImput.value === '' || fechaImput.value === ''){
        alert('TODOS LOS CAMPOS SON OBLIGATORIOS...');
        return;
    }

    if(editando){
        editarestudiante();
        editando = false;
    } else {
        objEstudiante.id = Date.now();
        objEstudiante.nombre = nombreImput.value;
        objEstudiante.grado = gradoImput.value;
        objEstudiante.grupo = grupoImput.value;
        objEstudiante.turno = turnoImput.value;
        objEstudiante.fecha = fechaImput.value;

        agregarEstudiante();
    }  
}

function agregarEstudiante(){
     listaEstudiantes.push({...objEstudiante});
     
     mostrarEstudiantes();

     formulario.reset();

     limpiarObjeto();
}

function limpiarObjeto(){
    objEstudiante.id = '';
    objEstudiante.nombre = '';
    objEstudiante.grado = '';
    objEstudiante.grupo = '';
    objEstudiante.turno = '';
    objEstudiante.fecha = '';
}

function mostrarEstudiantes(){

    limpiarHTML();

    const divEstudiantes = document.querySelector('.div-estudiantes');

    listaEstudiantes.forEach( estudiantes => {
        const {id, nombre, grado, grupo, turno, fecha} = estudiantes;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${grado} - ${grupo} - ${turno} - ${fecha} -`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEstudiantes(estudiantes);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEstudiante(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEstudiantes.appendChild(parrafo);
        divEstudiantes.appendChild(hr);
    })
}

function cargarEstudiantes(estudiantes){
    const {id, nombre, grado, grupo, turno, fecha} = estudiantes;

    nombreImput.value = nombre;
    gradoImput.value = grado;
    grupoImput.value = grupo;
    turnoImput.value = turno;
    fechaImput.value = fecha;

    objEstudiante.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarestudiante(){

    objEstudiante.nombre = nombreImput.value;
    objEstudiante.grado = gradoImput.value;
    objEstudiante.grupo = grupoImput.value;
    objEstudiante.turno = turnoImput.value;
    objEstudiante.fecha = fechaImput.value;

    listaEstudiantes.map( estudiantes => {
        if(estudiantes.id === objEstudiante.id) {
            estudiantes.id = objEstudiante.id;
            estudiantes.nombre = objEstudiante.nombre;
            estudiantes.grado = objEstudiante.grado;
            estudiantes.grupo = objEstudiante.grupo;
            estudiantes.turno = objEstudiante.turno;
            estudiantes.fecha = objEstudiante.fecha;
        }

    })

    limpiarHTML();
    mostrarEstudiantes();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarEstudiante(id){
    
    listaEstudiantes = listaEstudiantes.filter( estudiantes => estudiantes.id !== id);

    limpiarHTML();
    mostrarEstudiantes();
}

function limpiarHTML() {

    const divEstudiantes = document.querySelector('.div-estudiantes');
    while(divEstudiantes.firstChild){
        divEstudiantes.removeChild(divEstudiantes.firstChild);
    }
}