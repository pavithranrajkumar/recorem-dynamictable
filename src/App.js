import { useState } from 'react';
import './App.css';
import Filter from './components/Filter/Filter';
import Table from './components/Table/Table';
import { TABLE_DATA } from './constants';

function App() {
  const [filters, setFilters] = useState([{ condition: 'AND', id: 'name', operator: 'CONTAINS', value: '' }]);
  return (
    <div className='App'>
      <Filter filters={filters} setFilters={setFilters} />
      <div>
        <Table
          head={['Name', 'Screen Name', 'Followers Count', 'Following Count', 'Location', 'Verified']}
          keys={['name', 'screen_name', 'followers_count', 'following_count', 'location', 'verified']}
          data={TABLE_DATA}
          filters={[...filters].filter((eachFilter) => eachFilter.value)}
        />
      </div>
    </div>
  );
}

export default App;
