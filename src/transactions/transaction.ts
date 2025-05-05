import {makeAutoObservable} from 'mobx'
import {ITransaction} from '../types/ITransaction'

interface TransactionConstructorDto {
    _id: string
    amount: number
    description: string
    dateInMs: number
}

export default class Transaction implements ITransaction {
    id: string
    amount: number
    description: string
    dateInMs: number

    constructor({
        _id,
        amount,
        description,
        dateInMs,
    }: TransactionConstructorDto) {
        makeAutoObservable(this)

        this.id = _id
        this.amount = amount
        this.description = description
        this.dateInMs = dateInMs
    }
}
