import {makeAutoObservable} from 'mobx'
import {IUser} from '../types/IUser'
import Checklist from '../checklist/checklist'
import ChecklistStore from '../checklist/checklist.store'

export interface UserConstructorDto {
    name: string
    timezoneOffsetInHr: number
    level: number
    totalScore: number
    xp: number
    multiplier: number
    maxMultiplier: number
    balance: number

    checklistStore: ChecklistStore
}

export default class User implements IUser {
    name: string
    timezoneOffsetInHr: number
    level: number = 1
    totalScore: number = 0
    xp: number = 0
    multiplier: number = 1
    maxMultiplier: number = 5
    balance: number = 0

    checklistStore: ChecklistStore

    constructor({
        name,
        timezoneOffsetInHr,
        level,
        totalScore,
        xp,
        multiplier,
        maxMultiplier,
        balance,
        checklistStore,
    }: UserConstructorDto) {
        makeAutoObservable(this)

        this.name = name
        this.timezoneOffsetInHr = timezoneOffsetInHr
        this.level = level
        this.totalScore = totalScore
        this.xp = xp
        this.multiplier = multiplier
        this.maxMultiplier = maxMultiplier
        this.balance = balance

        this.checklistStore = checklistStore
    }

    get checklists(): Checklist[] {
        return this.checklistStore.checklists
    }

    get currentChecklist(): Checklist | undefined {
        return this.checklistStore.todaysChecklist ?? undefined
    }

    setBalance(balance: number) {
        this.balance = balance
    }

    addToBalance(amount: number) {
        this.balance += amount
    }
}
