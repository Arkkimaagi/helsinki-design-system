import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './KeyboardNavigation.module.scss';

export type KeyboardNavigationProps = React.PropsWithChildren<unknown>;

export const KeyboardNavigation = ({ children }: KeyboardNavigationProps) => {
  return <div className={styles.keyboardNavigation}>{children}</div>;
};
