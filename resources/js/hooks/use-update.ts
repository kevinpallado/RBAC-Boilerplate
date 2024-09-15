import React from 'react';

interface TableUpdateProps {
  callback: () => void;
  dependencies: [];
}
const useTableUpdate = (props: TableUpdateProps) => {
  const isFirst = React.useRef(true);
  React.useEffect(() => {
    if (!isFirst.current) {
      let debouncer = setTimeout(() => props.callback(), 500);
      return () => clearTimeout(debouncer);
    }
  }, props.dependencies);

  React.useEffect(() => {
    isFirst.current = false;
  }, []);
};

export default useTableUpdate;
