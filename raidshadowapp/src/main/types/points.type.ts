import { Optional } from 'sequelize'

export interface Point {
  pointID: number
  date: Date
  userPoints: number
  idUser: number
}

export interface NewPoint extends Optional<Point, 'pointID'> {}
