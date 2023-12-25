import { PrismaClient } from '@prisma/client'
import { ValueCreate, ValueDB } from '../types/values.type'

class ValuesDao {
  private valuesInstance: PrismaClient['criteriaValues']
  constructor(valuesInstance: PrismaClient['criteriaValues']) {
    this.valuesInstance = valuesInstance
  }

  update = async (id: number, values: ValueCreate): Promise<ValueDB> => {
    try {
      return await this.valuesInstance.create({
        data: {
          realValue: values.realValue,
          inGameValue: values.inGameValue,
          idCriteria: id
        }
      })
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
