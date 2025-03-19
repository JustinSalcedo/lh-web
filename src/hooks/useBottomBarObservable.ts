import {createContext, useContext} from 'react'
import root from '../root'

const useBottomBarObservable = () =>
    useContext(createContext(root.bottomBarObservable))

export default useBottomBarObservable
