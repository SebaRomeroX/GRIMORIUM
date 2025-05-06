// todos los spells que existen
const listaSpells = [
    {
        nombre: 'Ataque',
        efecto: 'daño',
        valor: 10
    },
    {
        nombre: 'Ataque',
        efecto: 'daño',
        valor: 8
    },
    {
        nombre: 'Ataque',
        efecto: 'daño',
        valor: 12
    },
    {
        nombre: 'Bloqueo',
        efecto: 'defenza',
        valor: 8
    },
    {
        nombre: 'Esquive',
        efecto: 'evacion',
        valor: 1
    },
]


export function cargarLibroSpells() {
    
    let spells = []
    
    console.log('Libro de spells: ')    

    for (let i = 0; i < 10; i++) {
        let numRand = aleatorio(listaSpells.length)
        spells.push(listaSpells[numRand])
        console.log((i+1)+". "+ spells[i].nombre + " " + spells[i].valor)    
    }

    return spells
}


function aleatorio(numero) {
    return Math.floor(Math.random() * numero)
}