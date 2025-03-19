import {makeAutoObservable} from 'mobx'
import {IChecklist} from '../types/IChecklist'
import ChecklistStore from './checklist.store'
import User, {UserConstructorDto} from '../users/user'
import Task from '../tasks/task'
import TaskApi from '../tasks/tasks.api'
import {TaskDto} from '../tasks/dto/task.dto'

interface ChecklistConstructorDto {
    dateStr: string
    score: number
    tasks: TaskDto[]
    startTimeInMs: number
    endTimeInMs: number
    processed: boolean
    reward?: number
    user: Omit<UserConstructorDto, 'checklistStore'>
    checklistStore: ChecklistStore
}

export default class Checklist implements IChecklist {
    dateStr: string
    score: number = 0
    tasks: Task[] = []
    startTimeInMs: number
    endTimeInMs: number
    processed: boolean = false
    reward: number = 0
    user: User

    checklistStore: ChecklistStore

    constructor({
        dateStr,
        score,
        tasks,
        startTimeInMs,
        endTimeInMs,
        processed,
        reward,
        user,
        checklistStore,
    }: ChecklistConstructorDto) {
        makeAutoObservable(this)

        this.dateStr = dateStr
        this.score = score
        const taskApi = new TaskApi()
        this.tasks = tasks.map(task => new Task({...task, api: taskApi}))
        this.startTimeInMs = startTimeInMs
        this.endTimeInMs = endTimeInMs
        this.processed = processed
        this.reward = reward || 0
        this.user = new User({...user, checklistStore})

        this.checklistStore = checklistStore
    }

    // aggregate all done task's earned scores
    get totalScore(): number {
        return this.tasks.reduce((acc, task) => acc + task.earnedScore, 0)
    }
}
