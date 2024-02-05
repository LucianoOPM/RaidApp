import Criterias from '../models/Criterias.model'
import { Criteria, NewCriteria } from '../types/criterias.type'

class CriteriaDao {
  private criteriaDb: typeof Criterias
  constructor(criteriaDb: typeof Criterias) {
    this.criteriaDb = criteriaDb
  }

  create = async (criteria: NewCriteria): Promise<Criteria> => {
    try {
      const res = await this.criteriaDb.create(criteria)
      return res
    } catch (error) {
      throw new Error('No se pudo crear la nueva criteria')
    }
  }

  findAll = async (): Promise<Criteria[]> => {
    try {
      const res = await this.criteriaDb.findAll({
        include: {
          all: true
        }
      })
      return res
    } catch (error) {
      throw new Error('Error en el servidor')
    }
  }
}

export default CriteriaDao
