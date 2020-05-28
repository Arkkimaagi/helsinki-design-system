import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconAngleRight: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 24V0h24v24z" />
      <path fill="currentColor" d="M13 12.5l-5-5L9.5 6l6.5 6.5L9.5 19 8 17.5z" />
    </g>
  </svg>
);

export default IconAngleRight;
