import {IChecklist} from './IChecklist'

export interface IUser {
    name: string
    timezoneOffsetInHr: number
    checklists: IChecklist[]
    currentChecklist?: IChecklist
    level: number
    totalScore: number
    xp: number
    multiplier: number
    maxMultiplier: number
    balance: number
}
