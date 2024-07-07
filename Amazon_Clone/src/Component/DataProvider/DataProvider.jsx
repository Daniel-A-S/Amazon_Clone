import React,{ createContext, useReducer} from 'react'




export const DataContext=createContext()

 export const DataProvider=({children, reducer,inititialState})=>{
    return (
        <DataContext.Provider value={useReducer(reducer, inititialState)}>
            {children}
        </DataContext.Provider>
    )
}
