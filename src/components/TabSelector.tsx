import React from 'react'
import { useStore } from '../store/store'
import Tab from './Tab';

export default function TabSelector() {

    const [{ selectedTab, documents }, dispatch] = useStore();

    const handleNewTabClick = () => {
        dispatch({type: 'CREATE_NEW_WORKSHEET'})
    }

    return (
        <div className="tab-selector">
            {documents.map((document,i) => {

                let documentName;

                if (document.docType === 'worksheet') {
                    documentName = document.name;
                } else {
                    const worksheetName = documents.find(worksheet => {
                        return worksheet.docType === 'worksheet' && worksheet.id === document.worksheetId
                    })
                    documentName = `${worksheetName} (solution)`
                }

                const isLeftOfSelected = i < documents.length-1 && selectedTab === i+1;

                return (
                    <Tab 
                        label={documentName}
                        isSelected={i === selectedTab}
                        isLeftOfSelected={isLeftOfSelected}
                        idx={i}
                        key={i}
                    />
                )
            })}
            <button 
                className="tab new-tab"
                onClick={handleNewTabClick}>
                <span className="tab__label new-tab__label">+</span>
            </button>
        </div>
    )
}
