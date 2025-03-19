import {computed, makeAutoObservable} from 'mobx'
import {RootStore} from '../root.store'
import {countCompletedTasks, countTasks} from '../utils/task'

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

    get progress() {
        return `${this.taskCountFraction} (${this.taskCompletionPercentage})`
    }
}
