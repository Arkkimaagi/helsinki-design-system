import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconZoomOut: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M14 2a8 8 0 11-4.953 14.283l-5.633 5.631L2 20.5l5.642-5.644A8 8 0 0114 2zm0 2a6 6 0 100 12 6 6 0 000-12zm4 5v2h-8V9h8z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconZoomOut;
