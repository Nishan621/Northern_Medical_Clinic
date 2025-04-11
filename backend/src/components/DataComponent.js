import { useEffect, useState } from 'react';
import { fetchData } from '../api/apiHelper';

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData('/patients');
      if (result) setData(result);
    };
    loadData();
  }, []);

  return <div>{data.length ? data.map(patient => <p key={patient.id}>{patient.name}</p>) : 'No data available'}</div>;
};

export default DataComponent;
