import ValuesDao from '../dao/values.dao'
import { ValueCreate, ValueDB } from '../types/values.type'

class ValuesService {
  private dao: ValuesDao
  constructor(dao: ValuesDao) {
    this.dao = dao
  }
  create = async (id: number, values: ValueCreate[]): Promise<ValueDB[]> => {
    try {
      const savedValues: ValueDB[] = []
      for (const value of values) {
        const save = await this.dao.create(id, value)
        if (!save) {
          throw new Error('Error al guardar el valor')
        }
        savedValues.push(save)
      }
      return savedValues
    } catch (error) {
      throw new Error('No se pudo crear los valores')
    }
  }
  update = async (idCriteria: number, values: ValueCreate[]): Promise<ValueDB[]> => {
    try {
      const savedValues: ValueDB[] = []
      for (const value of values) {
        const save = await this.dao.update(idCriteria, value)
        if (!save) {
          throw new Error('Error al guardar el valor')
        }
        savedValues.push(save)
      }
      return savedValues
    } catch (error) {
      throw new Error('No se pudo crear los valores')
    }
  }

  getByCriteria = async (idCriteria: number): Promise<ValueDB[]> => {
    try {
      const values = await this.dao.getByCriteria(idCriteria)
      if (!values) {
        throw new Error('Error al obtener los valores')
      }
      return values as ValueDB[]
    } catch (error) {
      throw new Error('No se pudo obtener los valores')
    }
  }
}
export default ValuesService
