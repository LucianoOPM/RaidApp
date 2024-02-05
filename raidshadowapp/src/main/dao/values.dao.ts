import CriteriaValues from '../models/CriteriaValues.model'
import {
  CriteriaValues as CrValues,
  NewCriteriaValue,
  UpdateCriteriaValue
} from '../types/values.type'
class ValuesDao {
  private valuesInstance: typeof CriteriaValues
  constructor(valuesInstance: typeof CriteriaValues) {
    this.valuesInstance = valuesInstance
  }
  create = async (values: NewCriteriaValue[]): Promise<CrValues[]> => {
    try {
      return await this.valuesInstance.bulkCreate(values, { returning: true })
    } catch (error) {
      throw new Error('Error al crear el nuevo valor.')
    }
  }

  update = async (
    idCritValue: number,
    values: UpdateCriteriaValue
  ): Promise<number> => {
    try {
      const [res] = await this.valuesInstance.update(values, { where: { idCritValue }})
      return res
    } catch (error) {
      throw new Error('Error al actualizar los datos')
    }
  }

  getByCriteria = async (idCriteria: number): Promise<CrValues[]> => {
    try {
      const res = await this.valuesInstance.findAll({
        where: { idCriteria }
      })
      return res
    } catch (error) {
      throw new Error('Error al obtener los valores')
    }
  }
}
export default ValuesDao
