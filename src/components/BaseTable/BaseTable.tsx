import React from 'react';
import './BaseTable.css';

interface BaseTableProps extends React.HTMLAttributes<HTMLTableElement> {}

function BaseTable({
  className,
  children,
  style,
}: BaseTableProps): JSX.Element {
  return (
    <div className="base-table table-responsive" style={style}>
      <table className={`table ${className}`}>{children}</table>
    </div>
  );
}

export default BaseTable;
