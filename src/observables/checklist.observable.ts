import {computed, makeAutoObservable} from 'mobx'
import {RootStore} from '../root.store'
import {setAndCountVisibleTasks} from '../utils/task'

export class ChecklistObservable {
    searchTerm: string = ''
    showCompletedTasks: boolean = true

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            allTasks: computed,
            visibleTasks: computed,
        })
    }

    get allTasks() {
        return this.rootStore.checklistStore.todaysChecklist?.tasks || []
    }

    get visibleTasks() {
        setAndCountVisibleTasks(
            this.allTasks,
            this.searchTerm,
            !this.showCompletedTasks,
        )

        return this.allTasks.filter(task => task.visible)
    }

    get loading() {
        return !this.rootStore.checklistStore.synced
    }

    setSearchTerm(term: string) {
        this.searchTerm = term
    }

    toggleShowCompletedTasks() {
        this.showCompletedTasks = !this.showCompletedTasks
    }
}
