import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconShare: React.FC<IconProps> = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M18.5 2.25a3.5 3.5 0 11-2.615 5.827L8.97 11.534a3.532 3.532 0 010 .932l6.916 3.457a3.5 3.5 0 11-.862 1.923l-6.95-3.474a3.5 3.5 0 110-4.743l6.95-3.475A3.5 3.5 0 0118.5 2.25zm0 14.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-13-6.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm13-6.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconShare;
