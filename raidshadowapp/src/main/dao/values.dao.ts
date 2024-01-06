import { PrismaClient } from '@prisma/client'
import { ValueCreate, ValueDB, acceptedUpdateValues } from '../types/values.type'

class ValuesDao {
  private valuesInstance: PrismaClient['criteriaValues']
  constructor(valuesInstance: PrismaClient['criteriaValues']) {
    this.valuesInstance = valuesInstance
  }
  create = async (id: number, value: ValueCreate): Promise<ValueDB> => {
    try {
      const newValue = await this.valuesInstance.create({
        data: {
          realValue: value.realValue,
          inGameValue: value.inGameValue,
          idCriteria: id
        }
      })
      console.log(newValue)

      return newValue
    } catch (error) {
      throw new Error('Error al crear el nuevo valor.')
    }
  }
  update = async (value: acceptedUpdateValues): Promise<ValueDB> => {
    try {
      const update = await this.valuesInstance.update({
        where: { idCritValue: value.idCritValue },
        data: {
          inGameValue: value.inGameValue,
          realValue: value.realValue
        }
      })
      return update
    } catch (error) {
      throw new Error('Error al crear el nuevo valor.')
    }
  }

  getByCriteria = async (idCriteria: number): Promise<ValueDB[]> => {
    try {
      const res = this.valuesInstance.findMany({
        where: { idCriteria: idCriteria }
      })
      return res
    } catch (error) {
      throw new Error('Error al obtener los valores')
    }
  }
}
export default ValuesDao
