import {computed, makeAutoObservable} from 'mobx'
import {RootStore} from '../root.store'
import {
    countCompletedRequiredTasks,
    countCompletedTasks,
    countRequiredTasks,
    countTasks,
} from '../utils/task'

export class TopBarObservable {
    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            todaysDate: computed,
            totalTasks: computed,
            completedTasks: computed,
            taskCountFraction: computed,
            taskCompletionPercentage: computed,
            progress: computed,
        })
    }

    get todaysDate() {
        return new Date().toLocaleDateString('es', {dateStyle: 'full'})
    }

    get totalTasks() {
        return this.rootStore.checklistStore.todaysChecklist
            ? countTasks(this.rootStore.checklistStore.todaysChecklist.tasks)
            : 0
    }

    get completedTasks() {
        return this.rootStore.checklistStore.todaysChecklist
            ? countCompletedTasks(
                  this.rootStore.checklistStore.todaysChecklist.tasks,
              )
            : 0
    }

    // tasks done / total tasks
    get taskCountFraction() {
        return `${this.completedTasks} / ${this.totalTasks}`
    }

    get taskCompletionPercentage() {
        if (this.totalTasks === 0) return '0%'
        return ((this.completedTasks / this.totalTasks) * 100).toFixed(0) + '%'
    }

    get totalRequiredTasks() {
        return this.rootStore.checklistStore.todaysChecklist
            ? countRequiredTasks(
                  this.rootStore.checklistStore.todaysChecklist.tasks,
              )
            : 0
    }

    get completedRequiredTasks() {
        return this.rootStore.checklistStore.todaysChecklist
            ? countCompletedRequiredTasks(
                  this.rootStore.checklistStore.todaysChecklist.tasks,
              )
            : 0
    }

    get requiredTaskCountFraction() {
        return `${this.completedRequiredTasks} / ${this.totalRequiredTasks}`
    }

    get requiredTaskCompletionPercentage() {
        if (this.totalRequiredTasks === 0) return '0%'
        return (
            (
                (this.completedRequiredTasks / this.totalRequiredTasks) *
                100
            ).toFixed(0) + '%'
        )
    }

    get progress() {
        if (this.completedRequiredTasks < this.totalRequiredTasks)
            return `${this.requiredTaskCountFraction} (${this.requiredTaskCompletionPercentage})`
        return `💎 ${this.taskCountFraction} (${this.taskCompletionPercentage})`
    }
}
