import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'x' | 'o'
export type RowEasy = [ Symbol | null, Symbol | null, Symbol | null ]
export type BoardEasy = [ RowEasy, RowEasy, RowEasy ]
export type WinningCellEasy = [number, number]

export type RowMedium = [ Symbol | null, Symbol | null, Symbol | null, Symbol | null ]
export type BoardMedium = [ RowMedium, RowMedium, RowMedium, RowMedium ]
export type WinningCellMedium = [[number, number],[number, number],[number, number],[number, number]]

export type Row = [ Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null ]
export type Board = [ Row, Row, Row, Row, Row, Row, Row, Row ]
export type WinningCell = number [][] 

// [[number, number],[number, number],[number, number],[number, number],
// [number, number],[number, number],[number, number],[number, number],
// [number, number],[number, number],[number, number],[number, number],
// [number, number],[number, number],[number, number],[number, number]]

//[number,number][]





type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null,null,null, null, null,null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow, emptyRow,emptyRow, emptyRow, emptyRow, emptyRow ]
// const emptyWinningCell: WinningCell = [[0, 1],[null, null],[null, null],[null, null],
//                                       [null, null],[null, null],[null, null],[null, null],
//                                       [null, null],[null, null],[null, null],[null, null],
//                                       [null, null],[null, null],[null, null],[null, null]]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('json', )
  winningCell: WinningCell

  @Column('char', {length:1, default: 'x'})
  turn: Symbol

  @Column('char', {length:1, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', {length: 1})
  symbol: Symbol
}
