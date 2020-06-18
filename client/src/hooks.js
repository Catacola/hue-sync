//@flow

import { useState } from 'react';

export function useInterval(intId: ?IntervalID = null) {
  const [id, setId] = useState<?IntervalID>(intId);

  return (newId: ?IntervalID) => {
    id !== null && clearInterval(id);
    setId(newId);
  };
}
