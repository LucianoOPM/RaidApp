import CriteriaService from '../service/criteria.service'
import { NewCriteria } from '../types/criterias.type'
import { ErrorResponse, SuccessResponse } from '../types/response.type'

class CriteriaController {
  private service: CriteriaService
  constructor(service: CriteriaService) {
    this.service = service
  }
  createCriteria = async (criteria: NewCriteria): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const saved = await this.service.create(criteria)
      return {
        code: 201,
        message: 'success',
        payload: JSON.stringify(saved)
      }
    } catch (error) {
      return {
        code: 400,
        error: 'No se pudo crear la nueva criteria'
      }
    }
  }

  getCriterias = async (): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const criterias = await this.service.findAll()
      return {
        code: 200,
        message: 'success',
        payload: JSON.stringify(criterias)
      }
    } catch (error) {
      return {
        code: 500,
        error: 'Error en el servidor'
      }
    }
  }
}
export default CriteriaController
