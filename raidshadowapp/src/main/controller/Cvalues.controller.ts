import ValuesService from '../service/cvalues.service'
import { ErrorResponse, SuccessResponse } from '../types/response.type'
import { NewCriteriaValue, ToUpdateValues } from '../types/values.type'

class ValuesController {
  private valuesService: ValuesService
  constructor(valueService: ValuesService) {
    this.valuesService = valueService
  }

  createValues = async (id: number): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const values: NewCriteriaValue[] = [
        { inGameValue: '0', realValue: 0, idCriteria: id },
        { inGameValue: '0', realValue: 0, idCriteria: id },
        { inGameValue: '0', realValue: 0, idCriteria: id },
        { inGameValue: '0', realValue: 0, idCriteria: id },
        { inGameValue: '0', realValue: 0, idCriteria: id }
      ]
      const res = await this.valuesService.create(values)
      const returning = res.map(({ idCritValue, idCriteria, realValue, inGameValue }) => {
        return { idCritValue, idCriteria, realValue, inGameValue }
      })
      return {
        code: 200,
        message: 'success',
        payload: JSON.stringify(returning, null, 2)
      }
    } catch (error) {
      return {
        code: 400,
        error: 'No se pudo crear el valor'
      }
    }
  }
  public updateValues = async (
    values: ToUpdateValues[]
  ): Promise<SuccessResponse | ErrorResponse> => {
    try {
      const res = await this.valuesService.update(values)

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
