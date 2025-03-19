import {ChecklistDto} from '../../checklist/dto/checklist.dto'

export interface UserDto {
    name: string
    timezoneOffsetInHr: number
    checklists: ChecklistDto[]
    currentChecklist?: ChecklistDto
    level: number
    totalScore: number
    xp: number
    multiplier: number
    maxMultiplier: number
    balance: number
}
