import {TaskDto} from '../../tasks/dto/task.dto'
import {UserDto} from '../../users/dto/user.dto'

export interface ChecklistDto {
    dateStr: string
    score: number
    tasks: TaskDto[]
    startTimeInMs: number
    endTimeInMs: number
    processed: boolean
    reward?: number
    user: UserDto
}
