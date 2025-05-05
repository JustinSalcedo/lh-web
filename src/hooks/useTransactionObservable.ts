import {createContext, useContext} from 'react'
import root from '../root'

const useTransactionObservable = () =>
    useContext(createContext(root.transactionObservable))

export default useTransactionObservable
