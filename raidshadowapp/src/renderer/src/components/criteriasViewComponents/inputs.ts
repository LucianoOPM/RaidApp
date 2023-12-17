export const inputs = [
  {
    idInput: 1,
    label: 'Criteria name',
    infoText: 'Ingrese el nombre de la criteria de evaluación',
    spanStyle: 'hidden text-gray-800 absolute right',
    name: 'name',
    type: 'text'
  },
  {
    idInput: 2,
    label: 'Puntos ingame',
    infoText:
      'Coloque las puntuaciones como se visualizan en el juego, Ejemplo: 25k,50k,70k, etc...',
    spanStyle: 'hidden text-gray-800 absolute right',
    name: 'inGamePoints',
    type: 'text'
  },
  {
    idInput: 3,
    label: 'Valor a evaluar',
    infoText: 'La puntuación con la que se evaluará. Ejemplo: -1, 0, 1, 2, etc...',
    spanStyle: 'hidden text-gray-800 absolute right',
    name: 'actualValue',
    type: 'number'
  }
]
