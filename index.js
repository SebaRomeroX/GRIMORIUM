import { cargarLibroSpells } from './modulos/spells.js'
import { aleatorio } from './modulos/aleatorio.js'
import { cargarOponente } from './modulos/oponentes.js'
import { asignarValores ,aplicarDefenza, aplicarEvacion, aplicarAtaque } from './modulos/aplicarEfectos.js'
 
//----------------------------------------------------------------- ELEMENTOS DEL DOM

// TITULO
const tituloMsj = document.getElementById('titulo')


// OPONENTE
const seccionOponente = document.getElementById('seccion-oponente')

const msjAccionEnemigo = document.getElementById('msj-accion-enemigo')
const msjVidaEnemigo = document.getElementById('msj-vida-enemigo')


// JUGADOR
const msjVidaJugador = document.getElementById('msj-vida-jugador')


// MENSAJES
const msjInfo = document.getElementById('mensaje')
const botonContinuar = document.getElementById('btn-continuar')


// BOTONES
const seccionBotones = document.getElementById('seccion-botones') 

const boton1 = document.getElementById('boton1')
const boton2 = document.getElementById('boton2')
const boton3 = document.getElementById('boton3')

boton1.addEventListener( 'click', accion1)
boton2.addEventListener( 'click', accion2)
boton3.addEventListener( 'click', accion3)




//----------------------------------------------------------------- VARIABLES GLOBALES

// spells del jugador
let libroSpells = []
let vidaJugador
let baraja

let oponente = {}
let accionEnemigo




/*----------------------------------------------------------------------- INICIO DE PARTIDA ----------------------------------------------------------------------------------

Empieza partida
cargamos libro de spells
10 spells



------------------------------*/


window.addEventListener('load', iniciarPartida)

function iniciarPartida() {
    // cuando empieza la partida cargamos 10 spells aleatorios
    libroSpells = cargarLibroSpells()


    // console.log('S1 inicia partida');
    botonContinuar.style.display = 'none'
    seccionBotones.style.display = 'flex'

    tituloMsj.innerHTML = 'Inicio de partida'
    msjInfo.innerHTML = 'Recibes un libro de hechizos'


    // pasamos a S2
    setTimeout(iniciarEnfrentamineto, 1000) // ARREGLAR ESTO, SE AMONTONAN LAS FUNCIONES 
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------








/*------------------------------------------------------------------------ INICIO DE ENFRENTAMIENTO -----------------------------------------------------------------------------

Elegimos oponente
Seteamos stats jugador


-----------------------------------------------*/


function iniciarEnfrentamineto() {
    // reiniciamos vida de jugador
    vidaJugador = 100
    
    
    // Elegimos oponente
    // usamos spread para hacer copia del obeto y no tocar el original
    oponente = { ...cargarOponente()} 
    

    
    console.log('S2 inicia enfrentamiento');
    
    botonContinuar.style.display = 'none'
    seccionBotones.style.display = 'flex'
    
    seccionOponente.style.backgroundImage = `url('./img/${oponente.imagen}')`
    tituloMsj.innerHTML = 'Enfrentamiento'
    msjInfo.innerHTML = 'Debes derrotar a tu oponente para continuar'
    msjVidaEnemigo.innerHTML = 'Vida enemigo: '+ oponente.vida
    msjVidaJugador.innerHTML = 'Vida jugador: '+ vidaJugador


    // pasamos a S3
    setTimeout(iniciarTurno, 1000)
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------












/*------------------------------------------------------------------------ COMBATE ------------------ -----------------------------------------------------------------------------

1ra PARTE
elegimos y mostramos accion oponente
eleccion jugador

2da Parte
aplicamos efectos

3ra Parte
revisamos vida


-----------------------------------------------*/


//----------------------------------------------------------- ACCIONES

function iniciarTurno() {
    // console.log('S3 inicio turno');
    tituloMsj.innerHTML = 'Inicio de Turno'
    msjInfo.innerHTML = 'Elige un hechizo'

    
    // accion del enemigo
    eligeAccionEnemigo()

    //accion jugador
    accionJugador()
}

// EXTRAER ESTO -------- RECICLAR -----------<<<<<<<<<<<<<<<<<<<
function eligeAccionEnemigo() {
    accionEnemigo = oponente.comportamiento()

    //PARA PRUEBA
    // accionEnemigo = oponente.skills[1]
    
    msjAccionEnemigo.innerHTML = `Enemigo usara: ${accionEnemigo.nombre} ${accionEnemigo.valor}`
}

//--------


function accionJugador() {

    // reiniciamos baraja
    baraja = []
    
    let numerosRand = [] // ------------- OPTIMIZAR, eliminar este array 

    for (let i = 0; i < 3; i++) {
        let numRand = aleatorio(libroSpells.length)

        // Evitamos que se eliga la misma mas de una vez
        if (numerosRand.includes(numRand)) {
            i--
        }else{
            numerosRand.push(numRand)
            baraja.push(libroSpells[numRand])
        }
    }
    
    /*
    
            AUTOMATIZAR BOTONES ***************************

    */

    boton1.innerHTML = baraja[0].nombre + " " + baraja[0].valor
    boton2.innerHTML = baraja[1].nombre + " " + baraja[1].valor
    boton3.innerHTML = baraja[2].nombre + " " + baraja[2].valor

    boton1.disabled = false
    boton2.disabled = false
    boton3.disabled = false
}

function accion1() {
    combate(baraja[0])
}

function accion2() {
    combate(baraja[1])
}

function accion3() {
    combate(baraja[2])
}





//----------------------------------------------------------- CONSECUENCIAS


function combate(spell) {
    // console.log('S4 resolver combate');

    boton1.disabled = true
    boton2.disabled = true
    boton3.disabled = true

    tituloMsj.innerHTML = 'Segunda Parte'
    msjInfo.innerHTML = 'Se aplican los efectos'


    //  ---------------VALORES

    let valoresJug = {
        ataque : 0,
        defenza : 0,
        evacion : 0
    } 
    
    let valoresOp = {
        ataque : 0,
        defenza : 0,
        evacion : 0
    } 


    // asignamos
    valoresJug = asignarValores(valoresJug, spell)
    valoresOp = asignarValores(valoresOp, accionEnemigo)

    console.log('valores jugador: ', valoresJug);
    console.log('valores oponente: ', valoresOp);


    //------------------ APLICAMOS EFECTOS

    //  defensa
    [ valoresJug, valoresOp ] = aplicarDefenza( valoresJug, valoresOp )

    // console.log('despues de aplicar def');
    // console.log('op: '+ valoresOp.ataque, ',  jug: '+ valoresJug.ataque);


    //  evacion
    [ valoresJug, valoresOp ] = aplicarEvacion( valoresJug, valoresOp )
    
    // console.log('despues de aplicar evacion');
    // console.log('op: '+ valoresOp.ataque, ',  jug: '+ valoresJug.ataque);


    // daño 
    console.log('vida jug: '+ vidaJugador);
    [ oponente.vida, vidaJugador ] = aplicarAtaque( valoresJug, valoresOp, vidaJugador, oponente.vida)

    //-------------------



    //MOSTRAMOS ACTUALIZADO
    msjVidaEnemigo.innerHTML = 'Vida enemigo: '+oponente.vida
    msjVidaJugador.innerHTML = 'Vida jugador: '+vidaJugador

    //termina el turno S5
    setTimeout( evaluarVida, 1200 ) 
}







//----------------------------------------------------------- FIN DEL TURNO

function evaluarVida() {
    tituloMsj.innerHTML = 'Fin del Turno'
    botonContinuar.addEventListener('click',iniciarEnfrentamineto)
    
    if (oponente.vida <= 0) {
        msjInfo.innerHTML= 'Ganaste !!'
        botonContinuar.style.display = 'block'
        seccionBotones.style.display = 'none'

        return

    }else if (vidaJugador <= 0) {
        msjInfo.innerHTML= 'Perdiste'
        botonContinuar.style.display = 'block'
        seccionBotones.style.display = 'none'

        return

    }else {
        msjInfo.innerHTML = 'Continua el combate'
        setTimeout( iniciarTurno, 600 ) 
    }
}