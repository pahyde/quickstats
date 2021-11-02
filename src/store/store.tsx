import { FC, createContext, Dispatch, useReducer, useContext } from "react";

type StoreState = {
    selectedTab: number
    documents: Array<Document>
}

type Document = Worksheet | Solution

export type Worksheet = {
    docType: 'worksheet'
    id: number
    name: string
    procedures: Array<Procedure>
}

type Procedure = 
    | EstimationOfMeans 
    | EstimationOfDiffOfMeans
    | EstimationOfProportions
    | EstimationOfDiffOfProportions

type EstimationOfMeans = {
    type: 'EstimationOfMeans'
    parameters: EstimationOfMeansParameters
}

type EstimationOfDiffOfMeans = {
    type: 'EstimationOfDiffOfMeans'
    parameters: EstimationOfDiffOfMeansParameters
}

type EstimationOfProportions = {
    type: 'EstimationOfProportions'
    parameters: EstimationOfProportionsParameters
}

type EstimationOfDiffOfProportions = {
    type: 'EstimationOfDiffOfProportions'
    parameters: EstimationOfDiffOfProportionsParameters
}

type EstimationOfMeansParameters = {
    'n': number | null
    'x_bar': number | null
    'sigma': number | null
    'cl': number | null
}

type EstimationOfDiffOfMeansParameters = {
    'n1': number | null
    'n2': number | null
    'x1_bar': number | null
    'x2_bar': number | null
    'sigma': number | null
    'cl': number | null
}

type EstimationOfProportionsParameters = {
    'n': number | null
    'x': number | null
    'cl': number | null
}

type EstimationOfDiffOfProportionsParameters = {
    'n1': number | null
    'n2': number | null
    'x1': number | null
    'x2': number | null
    'cl': number | null
}

export type Solution = {
    docType: 'solution'
    worksheetId: number
    procedure: Procedure
    solutionBody: Array<string>
}

type StoreAction = 
    | { type: 'CREATE_NEW_WORKSHEET' }
    | { type: 'SELECT_TAB', payload: number}
    | { type: 'CLOSE_TAB', payload: number}


type StoreContext = [StoreState, Dispatch<StoreAction>]


const storeContext = createContext<StoreContext>([
    {} as StoreState,
    {} as Dispatch<StoreAction>
]);

const store: StoreState = {
    selectedTab: 0,
    documents: [
        {
            docType: 'worksheet',
            id: 0,
            name: 'worksheet-1',
            procedures: [
                {
                    type: 'EstimationOfMeans',
                    parameters: {
                        'n': null,
                        'x_bar': null,
                        'sigma': null,
                        'cl': null
                    }
                }
            ]
        }
    ]
}

const getWorksheets = (docs: Array<Document>) => {
    return docs.filter(doc => doc.docType === 'worksheet');
}

const addWorksheet = (state: StoreState) => {
    
    const worksheetIds = getWorksheets(state.documents).map(worksheet => (worksheet as Worksheet).id)
    let newWorksheetId = worksheetIds.length;
    for (let i = 0; i < worksheetIds.length; i++) {
        if (!worksheetIds.includes(i)) {
            newWorksheetId = i;
            break;
        }
    }

    const newWorksheetName = `worksheet-${newWorksheetId + 1}`
    const newWorkSheet: Worksheet = {
        docType: 'worksheet',
        id: newWorksheetId,
        name: newWorksheetName,
        procedures: []
    }
    return {
        selectedTab: state.documents.length,
        documents: [...state.documents, newWorkSheet]
    }
}

const removeTab = (state: StoreState, idx: number) => {
    const selectedTab = Math.min(state.selectedTab, state.documents.length-2);
    return {
        selectedTab,
        documents: state.documents.filter((_,i) => i !== idx)
    }
}

const reducer = (state: StoreState, action: StoreAction): StoreState => {
    switch (action.type) {
        case 'CREATE_NEW_WORKSHEET':
            return addWorksheet(state)
        case 'SELECT_TAB':
            return { ...state, selectedTab: action.payload }
        case 'CLOSE_TAB':
            return removeTab(state, action.payload)
        default:
            return state
    }
}


export const StoreProvider: FC = ({ children }) => {
    return (
        <storeContext.Provider value={useReducer(reducer, store)}>
            {children}
        </storeContext.Provider>
    )
}

export const useStore = () => useContext(storeContext);