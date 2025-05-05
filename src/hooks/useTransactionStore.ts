import {createContext, useContext} from 'react'
import root from '../root'

const useTransactionStore = () =>
    useContext(createContext(root.transactionStore))

export default useTransactionStore
