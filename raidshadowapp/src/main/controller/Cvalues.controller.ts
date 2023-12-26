import ValuesService from '../service/cvalues.service'
import { ErrorResponse, SuccessResponse } from '../types/response.type'
import { ValueCreate } from '../types/values.type'

class ValuesController {
  private valuesService: ValuesService
  constructor(valueService: ValuesService) {
    this.valuesService = valueService
  }

  createValues = async (
    id: number,
    values: ValueCreate[]
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const res = await this.valuesService.create(id, values)
      return {
        code: 200,
        message: 'success',
        payload: JSON.stringify(res, null, 2)
      }
    } catch (error) {
      return {
        code: 400,
        error: 'No se pudo crear el valor'
      }
    }
  }
  public updateValues = async (
    id: number,
    values: ValueCreate[]
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const res = await this.valuesService.update(id, values)
      return {
        code: 200,
        message: 'success',
        payload: JSON.stringify(res, null, 2)
      }
    } catch (error) {
      return {
        code: 400,
        error: 'No se pudo crear el valor.'
      }
    }
  }

  getByCriteria = async (idCriteria: string): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const res = await this.valuesService.getByCriteria(Number(idCriteria))

      return {
        code: 200,
        message: 'success',
        payload: JSON.stringify(res, null, 2)
      }
    } catch (error) {
      return {
        code: 400,
        error: 'No se pudo obtener los datos'
      }
    }
  }
}

export default ValuesController
