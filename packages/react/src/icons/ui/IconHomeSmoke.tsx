import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconHomeSmoke: React.FC<IconProps> = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M12 4l11 11-1.5 1.5L20 15v8H4v-8l-1.5 1.5L1 15 12 4zm0 3l-6 6v8l2.999-.001L9 14h6l-.001 6.999L18 21v-8l-6-6zm1 9h-2l-.001 4.999h2L13 16zm7-15c0 .901-.237 1.406-.833 2.123l-.098.115c-.456.533-.569.752-.569 1.262 0 .478.099.7.488 1.166l.081.096c.635.74.904 1.238.929 2.099L20 8h-1.5c0-.478-.099-.7-.488-1.166l-.081-.096C17.262 5.958 17 5.448 17 4.5c0-.901.237-1.406.833-2.123l.098-.115c.428-.5.554-.723.568-1.17L18.5 1H20z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconHomeSmoke;
