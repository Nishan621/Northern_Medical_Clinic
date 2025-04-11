import { useState, useEffect } from 'react';
import { fetchData } from '../api/apiHelper';

const PaginatedList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData(`/appointments?page=${page}`);
      if (result) setData(result);
    };
    loadData();
  }, [page]);

  return (
    <div>
      {data.map(appointment => <p key={appointment.id}>{appointment.date}</p>)}
      <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
  );
};

export default PaginatedList;
