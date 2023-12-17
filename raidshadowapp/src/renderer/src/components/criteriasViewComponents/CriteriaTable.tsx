import { Criterias } from '@renderer/types/criterias.types'
import { FC, useEffect, useState } from 'react'
import { Button, Card, Typography } from '@material-tailwind/react'

const tableHead = ['Criteria', 'In game points', 'Value points', 'Más detalles']

interface CriteriaTableProps {
  registered: boolean
}

const CriteriaTable: FC<CriteriaTableProps> = ({ registered }): JSX.Element => {
  const [criterias, setCriterias] = useState<Criterias>([])
  useEffect(() => {
    const getData = async (): Promise<void> => {
      const res = await window.api.getCriterias()
      if ('error' in res) {
        console.log(res.error)
      } else {
        if ('payload' in res) {
          const parsed = JSON.parse(res.payload)
          setCriterias(parsed)
        } else {
          console.log('No se pudo obtener la data')
        }
      }
    }
    getData()
  }, [registered])
  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <Card placeholder={''} className="w-1/2">
          <table>
            <thead>
              <tr>
                {tableHead.map((head, index) => {
                  return (
                    <th key={index}>
                      <Typography placeholder={''}>{head}</Typography>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="text-center">
              {criterias.map((criteria, index) => {
                const isLast = index === criterias.length - 1
                const styles = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
                return (
                  <tr key={index}>
                    <td className={styles}>
                      <Typography placeholder={''}>{criteria.name}</Typography>
                    </td>
                    <td className={styles}>
                      <Typography placeholder={''}>{criteria.inGamePoints}</Typography>
                    </td>
                    <td className={styles}>
                      <Typography placeholder={''}>{criteria.actualValue}</Typography>
                    </td>
                    <td className={styles}>
                      <Button placeholder={''}>{'>'}</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}

export default CriteriaTable
