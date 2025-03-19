import {ITask} from './ITask'
import {IUser} from './IUser'

export interface IChecklist {
    dateStr: string
    score: number
    tasks: ITask[]
    startTimeInMs: number
    endTimeInMs: number
    processed: boolean
    reward?: number
    user: IUser
}
