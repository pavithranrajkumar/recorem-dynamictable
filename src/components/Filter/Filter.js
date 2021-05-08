import classes from './Filter.module.css';
import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import DeleteIcon from '../../assets/dustbin.svg';
import { FILTER_IDS, FILTER_OPERATORS, FILTER_TYPES } from '../../constants';

const Filter = ({ filters = [], setFilters }) => {
  const handleAddFilters = () => {
    const processedFilters = [...filters, { condition: 'AND', id: 'name', operator: 'CONTAINS', value: '' }];
    setFilters(processedFilters);
  };

  const handleRemoveFilters = (index) => {
    const processedFilters = [...filters];
    processedFilters.splice(index, 1);
    setFilters(processedFilters);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const processedFilters = [...filters];

    switch (name) {
      case 'condition':
        processedFilters[index].condition = value;
        break;
      case 'id':
        processedFilters[index].id = value;
        processedFilters[index].operator = FILTER_OPERATORS.filter((operator) => operator.filterFor === FILTER_TYPES[value])[0].value;
        value === 'verified' ? (processedFilters[index].value = 'true') : (processedFilters[index].value = '');
        break;
      case 'operator':
        processedFilters[index].operator = value;
        break;
      case 'value':
        processedFilters[index].value = value;
        break;
      default:
        break;
    }
    setFilters(processedFilters);
  };

  return (
    <div className={classes.Container}>
      {filters.map((filter, idx) => {
        const filterOperators = FILTER_OPERATORS.filter((operator) => operator.filterFor === FILTER_TYPES[filter.id]);
        return (
          <div key={idx} className={classes.Filter}>
            <div>
              {idx > 0 ? (
                <Dropdown
                  id='condition'
                  name='condition'
                  options={[
                    { label: 'AND', value: 'AND' },
                    { label: 'OR', value: 'OR' },
                  ]}
                  value={filter.condition}
                  onChange={(event) => handleInputChange(idx, event)}
                />
              ) : (
                <div className={classes.ConditionText}>WHERE</div>
              )}
            </div>
            <div>
              <Dropdown id='id' name='id' options={FILTER_IDS} value={filter.id} onChange={(event) => handleInputChange(idx, event)} />
            </div>
            <div>
              <Dropdown
                id='operator'
                name='operator'
                options={filterOperators}
                value={filter.operator}
                onChange={(event) => handleInputChange(idx, event)}
              />
            </div>
            <div className={classes.SearchKey}>
              {FILTER_TYPES[filter.id] !== 'boolean' ? (
                <input
                  type={FILTER_TYPES[filter.id]}
                  id='value'
                  name='value'
                  value={filter.value}
                  onChange={(event) => handleInputChange(idx, event)}
                />
              ) : (
                <Dropdown
                  id='value'
                  name='value'
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  value={filter.value}
                  onChange={(event) => handleInputChange(idx, event)}
                />
              )}
            </div>
            <div className={classes.DeleteButton}>
              <img src={DeleteIcon} alt='' onClick={() => handleRemoveFilters(idx)} />
            </div>
          </div>
        );
      })}
      <button className={classes.Button} onClick={handleAddFilters}>
        Add Filter
      </button>
    </div>
  );
};

export default Filter;
