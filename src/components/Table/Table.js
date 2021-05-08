/* eslint-disable default-case */
import classes from './Table.module.css';
import React from 'react';
import { filterWithConditions, getValue } from '../../utils/objectHelper';
import CancelIcon from '../../assets/cancel.svg';
import TickIcon from '../../assets/tick.svg';

const Table = ({ head, keys, data, filters = [] }) => {
  const processedData = filterWithConditions(data, filters);

  return (
    <div className={classes.TableContainer}>
      <table>
        <tr>
          {head?.map((item) => (
            <th>{item}</th>
          ))}
        </tr>
        {processedData?.length ? (
          processedData.map((row, i) => (
            <tr>
              {keys?.map((key) => {
                const value = getValue(row, key);
                return (
                  <td>
                    {typeof value !== 'boolean' ? (
                      value
                    ) : value ? (
                      <img className={classes.VerifiedIcon} src={TickIcon} alt='yes' />
                    ) : (
                      <img className={classes.VerifiedIcon} src={CancelIcon} alt='no' />
                    )}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={head?.length}>
              <div className={classes.NoData}>
                <div>No Records To Display</div>
              </div>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default Table;
