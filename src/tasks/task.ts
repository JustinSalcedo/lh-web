import {
    computed,
    IReactionDisposer,
    makeAutoObservable,
    reaction,
    runInAction,
} from 'mobx'
import {ExpandedFormat} from '../types'
import {ITask} from '../types/ITask'
import TaskApi from './tasks.api'
import {TaskDto} from './dto/task.dto'

interface TaskConstructorDto {
    _id: string
    name: string
    done: boolean
    score?: number
    mandatory?: boolean
    reps?: number
    repsDone?: number
    expandedFormat?: ExpandedFormat
    subTasks: TaskDto[]
    parentTask?: Task
    api: TaskApi
}

export default class Task implements ITask {
    id: string
    name: string
    done: boolean
    score?: number | undefined
    mandatory?: boolean | undefined
    reps?: number | undefined
    repsDone?: number | undefined
    expandedFormat?: ExpandedFormat | undefined
    subTasks: Task[]
    parentTask: Task | null = null
    visible: boolean = true

    api: TaskApi

    subTasksDoneReactionDisposer: IReactionDisposer | null = null
    checkTaskReactionDisposer: IReactionDisposer | null = null
    syncTaskTimeoutId: NodeJS.Timer | number = 0

    constructor({
        _id,
        name,
        done,
        score,
        mandatory,
        reps,
        repsDone,
        expandedFormat,
        subTasks,
        parentTask,
        api,
    }: TaskConstructorDto) {
        makeAutoObservable(this, {
            syncTaskTimeoutId: false,
            subTasksDoneReactionDisposer: false,
            checkTaskReactionDisposer: false,
            allSubtasksDone: computed,
            aggregatedScore: computed,
            displayText: computed,
            earnedScore: computed,
            visibleSubTasks: computed,
        })

        this.id = _id
        this.name = name
        this.done = done
        this.score = score
        this.mandatory = mandatory
        this.reps = reps
        this.repsDone = repsDone
        this.expandedFormat = expandedFormat
        this.api = api
        this.parentTask = parentTask || null
        this.subTasks = subTasks.map(
            subTask => new Task({...subTask, parentTask: this, api}),
        )

        this.init()
    }

    init() {
        this.initReactions()
        this.setDone(this.allSubtasksDone)
    }

    initReactions() {
        this.subTasksDoneReactionDisposer = reaction(
            () => this.allSubtasksDone,
            allSubtasksDone => {
                this.setDone(allSubtasksDone)
            },
        )
        this.checkTaskReactionDisposer = reaction(
            () => ({done: this.done, repsDone: this.repsDone}),
            ({done, repsDone}) => {
                clearTimeout(this.syncTaskTimeoutId)
                runInAction(() => {
                    this.syncTaskTimeoutId = setTimeout(() => {
                        this.api.checkTask({
                            id: this.id,
                            done,
                            repsDone,
                        })
                    }, 1000)
                })
            },
        )
    }

    get allSubtasksDone() {
        if (!this.subTasks.length) return this.done
        return this.subTasks.reduce((acc, task) => acc && task.done, true)
    }

    get aggregatedScore(): number {
        if (this.subTasks.length)
            return this.subTasks.reduce(
                (acc, task) => acc + task.aggregatedScore,
                0,
            )
        if (this.reps) return this.reps * (this.score || 0)
        return this.score || 0
    }

    get earnedScore(): number {
        if (this.subTasks.length)
            return this.subTasks.reduce(
                (acc, task) => acc + task.earnedScore,
                0,
            )
        if (this.reps) return (this.repsDone || 0) * (this.score || 0)
        if (this.done) return this.aggregatedScore
        return 0
    }

    get displayText() {
        if (!this.parentTask) return this.name
        if (this.parentTask.expandedFormat === 'verb-noun') {
            return `${this.name} ${this.parentTask.name}`
        }
        return this.name
    }

    get visibleSubTasks() {
        return this.subTasks.filter(task => task.visible)
    }

    get required() {
        return this.mandatory || !!this.parentTask?.mandatory
    }

    setVisible(visible: boolean) {
        this.visible = visible
    }

    setDone(done: boolean) {
        this.done = done
    }

    checkTask() {
        if (this.subTasks.length) return
        if (this.reps) {
            this.repsDone = (this.repsDone || 0) + 1
            if (this.repsDone > this.reps) this.repsDone = 0
            this.done = this.repsDone === this.reps
            return
        }
        this.done = !this.done
    }
}
