import {createContext, useContext} from 'react'
import root from '../root'

const useTopBarObservable = () =>
    useContext(createContext(root.topBarObservable))

export default useTopBarObservable
