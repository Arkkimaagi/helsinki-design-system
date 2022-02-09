import React from "react"

import { Table } from 'hds-react';

const cols = [
  { key: 'cssVariable', headerName: 'CSS variable' },
  { key: 'sassVariable', headerName: 'SASS variable' },
  { 
    key: 'pxValue', 
    headerName: 'PX value',
    transform: ({ pxValue }) => {
      return <div style={{ textAlign: 'right' }}>{pxValue}</div>;
    }, 
  },
  { 
    key: 'remValue',
    headerName: 'REM value',
    transform: ({ remValue }) => {
      return <div style={{ textAlign: 'right' }}>{remValue}</div>;
    },
  },
  { key: 'example', headerName: 'Example' },
];

const rows = [
  { cssVariable: <code>--spacing-layout-2-xs</code>, sassVariable: <code>$spacing-layout-2-xs</code>, pxValue: '16px', remValue: '1rem', example: '' },
  { cssVariable: <code>--spacing-layout-xs</code>, sassVariable: <code>$spacing-layout-xs</code>, pxValue: '24px', remValue: '1.5rem', example: '' },
  { cssVariable: <code>--spacing-layout-s</code>, sassVariable: <code>$spacing-layout-s</code>, pxValue: '32px', remValue: '2rem', example: '' },
  { cssVariable: <code>--spacing-layout-m</code>, sassVariable: <code>$spacing-layout-m</code>, pxValue: '48px', remValue: '3rem', example: '' },
  { cssVariable: <code>--spacing-layout-l</code>, sassVariable: <code>$spacing-layout-l</code>, pxValue: '64px', remValue: '4rem', example: '' },
  { cssVariable: <code>--spacing-layout-xl</code>, sassVariable: <code>$spacing-layout-xl</code>, pxValue: '96px', remValue: '6rem', example: '' },
  { cssVariable: <code>--spacing-layout-2-xl</code>, sassVariable: <code>$spacing-layout-2-xl</code>, pxValue: '128px', remValue: '8rem', example: '' },
];

export default function LayoutTokensTable() {
  return (
    <Table cols={cols} rows={rows} heading="Layout tokens" headingAriaLevel={3} indexKey="id" renderIndexCol={false} />
  );
}