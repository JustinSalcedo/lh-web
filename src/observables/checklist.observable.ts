import {computed, makeAutoObservable} from 'mobx'
import {RootStore} from '../root.store'
import {setAndCountVisibleTasks} from '../utils/task'

export class ChecklistObservable {
    searchTerm: string = ''
    showCompletedTasks: boolean = true
    showNonRequiredTasks: boolean = true

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {
            allTasks: computed,
            visibleTasks: computed,
            loading: computed,
            isActive: computed,
            isProcessed: computed,
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
            !this.showNonRequiredTasks,
        )

        return this.allTasks.filter(task => task.visible)
    }

    get loading() {
        return !this.rootStore.checklistStore.synced
    }

    get isActive() {
        return (
            this.rootStore.checklistStore.todaysChecklist &&
            (this.rootStore.checklistStore.todaysChecklist.endTimeInMs >
                Date.now() ||
                this.rootStore.checklistStore.todaysChecklist.processed)
        )
    }

    get isProcessed() {
        return (
            !this.loading &&
            !!this.rootStore.checklistStore.todaysChecklist?.processed
        )
    }

    setSearchTerm(term: string) {
        this.searchTerm = term
    }

    toggleShowCompletedTasks() {
        this.showCompletedTasks = !this.showCompletedTasks
    }

    toggleShowNonRequiredTasks() {
        this.showNonRequiredTasks = !this.showNonRequiredTasks
    }
}
