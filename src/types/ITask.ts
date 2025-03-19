import {ExpandedFormat} from '.'

export interface ITask {
    id: string
    name: string
    done: boolean
    score?: number
    mandatory?: boolean
    reps?: number
    repsDone?: number
    expandedFormat?: ExpandedFormat
    subTasks: ITask[]
}

export interface IVisibleTask {
    displayText: string
    done: boolean
    visible: boolean
    setVisible: (visible: boolean) => void
    subTasks: IVisibleTask[]
}
