import React from 'react'
import MainScreen from './screens/Main.screen'
import './root'
// import MasterListScreen from './screens/MasterList.screen'
// import {parseItems} from './utils/item'

// const rawList = `- *pet{Izzy, Honey}: 10(2)[noun]
// - sweep: 15
// - kitchen: [verb-noun]
//     - *cook: 20
//     - wash dishes: 10(2)`
// console.log(rawList)

// const item = parseItems(rawList)
// console.log(item)

function App() {
    return (
        <div>
            <MainScreen />
            {/* <MasterListScreen /> */}
        </div>
    )
}

export default App
