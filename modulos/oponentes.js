
export function cargarOponente() {
    const oponente = oponentes[0] // por ahora es una, despues hacer array de oponentes

    return oponente
}



function generarAtaqueAleatorio(acciones) {
    let listado = [] // guardamos acciones a usar

    for (let i = 0; i < acciones.length; i++) { // acciones disponibles
        for (let j = 0; j < acciones[i].chance; j++) { // cantidad de probabilidades de cada accion
            listado.push(i);
        }
    }
    // console.log(listado);
    

    let numRand = Math.floor(Math.random() * listado.length) // posicion en listado
    // console.log(numRand);
    // console.log(listado[numRand]);
    

    let accion = acciones[listado[numRand]] // posicion en acciones
    // console.log(accion);

    return accion
}

const oponentes = [
    {
        nombre: "Guerrero desconocido",
        imagen: 'guerrero_desconocido.jpg',
        vida: 120,
        comportamiento: function() {          
            const acciones = [
                {
                    nombre: 'Ataque',
                    efecto: 'daño',
                    valor: 10,
                    chance: 2
                },
                {
                    nombre: 'Ataque',
                    efecto: 'daño',
                    valor: 8,
                    chance: 2
                },
                {
                    nombre: 'Escudo',
                    efecto: 'defenza',
                    valor: 5,
                    chance: 2
                },
                {
                    nombre: 'Esquive',
                    efecto: 'evacion',
                    valor: 1,
                    chance: 1
                },
            ]

            const accion = generarAtaqueAleatorio(acciones)
            return accion 
        }
    }
]
