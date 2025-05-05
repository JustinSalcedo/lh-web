import {makeAutoObservable} from 'mobx'

type ScreenView = 'checklist' | 'transactions' | 'add-transaction'

export class ViewsObservable {
    currentView: ScreenView = 'checklist'

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentView(view: ScreenView) {
        this.currentView = view
    }
}
