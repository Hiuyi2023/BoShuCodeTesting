import { useState } from "react";
import _ from 'lodash';
import './CheckBoxGroup.css';
import { convertToColumnData } from './utils';

const KEY_ALL = 'all';
const TEXT_ALL = 'select All';

const CheckBoxGroup = (props) => {
    /*
        options: checkbox data list
        defaultColumns: initial columns count
        onChange: callback when checkbox change
    */
    const { options, defaultColumns, onChange } = props;
    const [checkedList, setCheckedList] = useState([]);
    const [columnCount, setColumnCount] = useState(defaultColumns);

    const maxSize = options.length + 1;
    const rowCount = Math.ceil(maxSize / columnCount);
    const combineOptions = convertToColumnData([{ key: KEY_ALL, text: TEXT_ALL }].concat(options), rowCount, columnCount);
    const fullKeys = combineOptions.map(opt => opt.key);

    // Handle onchange trigger
    const handleChange = (key) => {
        let newList = [...checkedList];
        let isFull = false;
        if (key === KEY_ALL) {
            if (checkedList.length === maxSize) {
                newList = [];
            } else {
                newList = fullKeys;
                isFull = true;
            }
        } else {
            const index = checkedList.indexOf(key);
            if (index > -1) {
                newList.splice(index, 1);
                const allIndex = newList.indexOf(KEY_ALL);
                allIndex > -1 && newList.splice(allIndex, 1);
            } else {
                newList.push(key);
                if (newList.length === maxSize - 1) {
                    newList = fullKeys;
                    isFull = true;
                }
            }
        }

        onChange({ selected: isFull ? options.map(opt => opt.key) : newList, options });
        setCheckedList(newList);
    };

    // Handle add column count
    const handleAdd = () => {
        const newCount = columnCount < maxSize ? columnCount + 1 : columnCount;
        setColumnCount(newCount);
    }

    // Handle minus column count
    const handleMinus = () => {
        const newCount = columnCount > 1 ? columnCount - 1 : columnCount;
        setColumnCount(newCount);
    }

    const CheckBox = (option) => {
        const { key, text } = option;
        const checked = checkedList.includes(key);

        return (<span key={key}>
            <input
                type='checkbox'
                checked={checked}
                onChange={_.partial(handleChange, key)}
            />
            <span>{text}</span>
        </span>);
    };

    const Counter = () => {
        return <div className="checkbox-group-counter">
            <span>Columns:</span>
            <div className="checkbox-group-counter-sub">
                <button onClick={handleAdd}>+</button>
                <div className="checkbox-group-counter-label">{columnCount}</div>
                <button onClick={handleMinus}>-</button>
            </div>
        </div>
    };

    return <div>
        <div
            className="checkbox-group"
            // Dynamic set column range
            style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
            {combineOptions.map((opt) => {
                return CheckBox(opt);
            })}
        </div>
        {Counter()}
    </div>
};

export default CheckBoxGroup;