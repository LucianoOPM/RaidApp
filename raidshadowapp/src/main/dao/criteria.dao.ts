import { PrismaClient } from '@prisma/client'
import { Criteria, NewCriteria } from '../types/criterias.type'

class CriteriaDao {
  private criteriaDb: PrismaClient['criterias']
  constructor(criteriaDb: PrismaClient['criterias']) {
    this.criteriaDb = criteriaDb
  }

  create = async (criteria: NewCriteria): Promise<Criteria> => {
    try {
      const res = await this.criteriaDb.create({
        data: {
          name: criteria.name
        }
      })
      return res
    } catch (error) {
      throw new Error('No se pudo crear la nueva criteria')
    }
  }

  findAll = async (): Promise<Criteria[]> => {
    try {
      const res = await this.criteriaDb.findMany({
        include: {
          CriteriaValues: true
        }
      })
      return res
    } catch (error) {
      throw new Error('Error en el servidor')
    }
  }
}

export default CriteriaDao
