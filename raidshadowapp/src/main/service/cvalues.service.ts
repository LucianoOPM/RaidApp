import ValuesDao from '../dao/values.dao'
import { CriteriaValues, NewCriteriaValue, ToUpdateValues } from '../types/values.type'

class ValuesService {
  private dao: ValuesDao
  constructor(dao: ValuesDao) {
    this.dao = dao
  }
  create = async (values: NewCriteriaValue[]): Promise<CriteriaValues[]> => {
    try {
      const save = await this.dao.create(values)
      return save
    } catch (error) {
      throw new Error('No se pudo crear los valores')
    }
  }
  update = async (values: ToUpdateValues[]): Promise<ToUpdateValues[]> => {
    try {
      const updatedValues: ToUpdateValues[] = []
      for (const value of values) {
        const updates: number = await this.dao.update(value.idCritValue, {
          realValue: +value.realValue,
          inGameValue: value.inGameValue
        })
        if(updates){
          updatedValues.push(value)
        }
      }
      return values
    } catch (error) {
      throw new Error('No se pudo crear los valores')
    }
  }

  getByCriteria = async (idCriteria: number): Promise<CriteriaValues[]> => {
    try {
      const values = await this.dao.getByCriteria(idCriteria)
      if (!values) {
        throw new Error('Error al obtener los valores')
      }
      return values as CriteriaValues[]
    } catch (error) {
      throw new Error('No se pudo obtener los valores')
    }
  }
}
export default ValuesService
