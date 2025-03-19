import {ExpandedFormat} from '.'

export interface IItem {
    name: string
    instances: string[]
    score?: number
    mandatory?: boolean
    subItems: IItem[]
    reps?: number
    expandedFormat?: ExpandedFormat
}
