import React from 'react';

export default function useTableUpdate(callback: any, dependencies: any) {
  const isFirst = React.useRef(true);
  React.useEffect(() => {
    if (!isFirst.current) {
      let debouncer = setTimeout(() => callback(), 500);
      return () => clearTimeout(debouncer);
    }
  }, dependencies);

  React.useEffect(() => {
    isFirst.current = false;
  }, []);
}
