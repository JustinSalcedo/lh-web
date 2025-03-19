import {createContext, useContext} from 'react'
import root from '../root'

const useChecklistObservable = () =>
    useContext(createContext(root.checklistObservable))

export default useChecklistObservable
