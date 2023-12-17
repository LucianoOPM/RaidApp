import CriteriaDao from '../dao/criteria.dao'
import { Criteria, NewCriteria } from '../types/criterias.type'

class CriteriaService {
  private criteriaDao: CriteriaDao
  constructor(criteriaDao: CriteriaDao) {
    this.criteriaDao = criteriaDao
  }

  create = async (criteria: NewCriteria): Promise<Criteria> => {
    try {
      return await this.criteriaDao.create(criteria)
    } catch (error) {
      throw new Error('No se pudo crear la nueva criteria')
    }
  }

  findAll = async (): Promise<Criteria[]> => {
    try {
      return await this.criteriaDao.findAll()
    } catch (error) {
      throw new Error('Error en el servidor')
    }
  }
}

export default CriteriaService
