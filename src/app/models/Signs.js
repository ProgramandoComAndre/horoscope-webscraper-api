class Signs {
    static signs = [
        'carneiro',
        'touro',
        'gemeos',
        'caranguejo',
        'leao',
        'virgem',
        'balanca',
        'escorpiao',
        'sagitario',
        'capricornio',
        'aquario',
        'peixes'
    ]

    static isValidSign(sign) {
        return Signs.signs.includes(sign)
    }
}

module.exports = { Signs }