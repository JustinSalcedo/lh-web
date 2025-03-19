import {makeAutoObservable} from 'mobx'
import ChecklistStore from './checklist/checklist.store'
import {TopBarObservable} from './observables/top-bar.observable'
import {ChecklistObservable} from './observables/checklist.observable'
import {BottomBarObservable} from './observables/bottom-bar.observable'

export class RootStore {
    checklistStore: ChecklistStore
    topBarObservable: TopBarObservable
    checklistObservable: ChecklistObservable
    bottomBarObservable: BottomBarObservable

    constructor() {
        makeAutoObservable(this, {init: false})

        this.checklistStore = new ChecklistStore(this)
        this.topBarObservable = new TopBarObservable(this)
        this.checklistObservable = new ChecklistObservable(this)
        this.bottomBarObservable = new BottomBarObservable(this)

        this.init()
    }

    init() {
        try {
            this.bootload()
        } catch (error) {}
    }

    async bootload() {
        try {
            await this.checklistStore.sync()
        } catch (error) {
            console.error(error)
        }
    }
}
