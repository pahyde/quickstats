import clsx from 'clsx'
import React, {MouseEvent} from 'react'
import { useHover } from '../hooks/useHover';
import { useStore } from '../store/store'
import ReactIcon from './ReactIcon'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
    label: string
    isSelected: boolean
    isLeftOfSelected: boolean
    idx: number
}

export default function Tab({ label, isSelected, isLeftOfSelected, idx }: Props) { 

    const [{},dispatch] = useStore();
    const [isHovered, handlers] = useHover();

    const handleSelectTab = () => {
        dispatch({type: 'SELECT_TAB', payload: idx})
        console.log('select tab')
    }

    const handleDeleteTab = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch({type: 'CLOSE_TAB', payload: idx})
    }

    return (
        <button
            onClick={handleSelectTab}
            {...handlers}
            className={clsx(
                'tab',
                isSelected && 'selected-tab'
            )}
        >
            <div
                className={clsx(
                    'tab-content',
                    isSelected && 'selected-tab-content',
                    isLeftOfSelected && 'tab-content--no-right-border'
                )}
            >
                <span 
                    className={clsx(
                        'tab-content__label',
                        isSelected && 'selected-tab-content__label'
                    )}
                >
                    {label}
                </span>
            </div>
            <button
                className={clsx(
                    "tab__close-btn"
                )}
                onClick={handleDeleteTab}
            >
                <span
                    className={clsx(
                        "tab__close-btn__icon",
                        isSelected && 'selected-tab__close-btn__icon',
                        !isHovered && 'display-hidden'
                    )}
                >
                    x
                </span>
            </button>
        </button>
    )
}
