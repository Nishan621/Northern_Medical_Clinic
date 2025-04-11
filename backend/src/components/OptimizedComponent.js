import { useMemo } from 'react';

const OptimizedComponent = ({ data }) => {
  const processedData = useMemo(() => data.map(item => item.value * 2), [data]);

  return <div>{processedData.join(', ')}</div>;
};

export default OptimizedComponent;
