import {makeAutoObservable} from 'mobx'
import ChecklistStore from './checklist/checklist.store'
import {TopBarObservable} from './observables/top-bar.observable'
import {ChecklistObservable} from './observables/checklist.observable'
import {BottomBarObservable} from './observables/bottom-bar.observable'
import {ViewsObservable} from './views/views.observable'
import {TransactionStore} from './transactions/transaction.store'
import TransactionObservable from './observables/transaction.observable'

export class RootStore {
    viewsObservable: ViewsObservable
    checklistStore: ChecklistStore
    topBarObservable: TopBarObservable
    checklistObservable: ChecklistObservable
    bottomBarObservable: BottomBarObservable
    transactionStore: TransactionStore
    transactionObservable: TransactionObservable

    constructor() {
        makeAutoObservable(this, {init: false})

        this.viewsObservable = new ViewsObservable()
        this.checklistStore = new ChecklistStore()
        this.topBarObservable = new TopBarObservable(this)
        this.checklistObservable = new ChecklistObservable(this)
        this.bottomBarObservable = new BottomBarObservable(this)
        this.transactionStore = new TransactionStore(this)
        this.transactionObservable = new TransactionObservable(this)

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
            setTimeout(async () => {
                await this.transactionStore.sync()
            }, 1000)
        } catch (error) {
            console.error(error)
        }
    }
}
