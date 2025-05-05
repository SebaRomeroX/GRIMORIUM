export function asignarValores( valores, skill ) {
    switch (skill.efecto) {
        case 'daño':
            valores.ataque = skill.valor
            break;
        case 'defenza':
            valores.defenza = skill.valor
            break;
        case 'evacion':
            valores.evacion = skill.valor
            break;
    }

    return valores
}


export function aplicarDefenza( valoresJug, valoresOp ) {    
    valoresOp.ataque -= valoresJug.defenza
    if (valoresOp.ataque < 0) {
        valoresOp.ataque = 0
    }

    valoresJug.ataque -= valoresOp.defenza
    if (valoresJug.ataque < 0) {
        valoresJug.ataque = 0
    }
    
    return [ valoresJug, valoresOp ]
}


export function aplicarEvacion( valoresJug, valoresOp ) {
    if (valoresJug.evacion == 1) {
        valoresOp.ataque = 0
    }

    if (valoresOp.evacion == 1) {
        valoresJug.ataque = 0
    }

    return [ valoresJug, valoresOp ]
}


export function aplicarAtaque( valoresJug, valoresOp, vidaJug, vidaOp ) {
    vidaOp -= valoresJug.ataque
    vidaJug -= valoresOp.ataque

    return [ vidaOp, vidaJug ]
}