import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconUpload: React.FC<IconProps> = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M12 1.636l5.657 5.657-1.414 1.414L13 5.465V18h-2V5.465L7.757 8.707 6.343 7.293 12 1.636zM5 15v5h14v-5h2v7H3v-7h2z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconUpload;
