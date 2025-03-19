import {ExpandedFormat} from '../../types'

export interface TaskDto {
    _id: string
    name: string
    done: boolean
    score?: number
    mandatory?: boolean
    reps?: number
    repsDone?: number
    expandedFormat?: ExpandedFormat
    subTasks: TaskDto[]
}
