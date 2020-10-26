import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconStar = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M5.202 22.231l.217-1.728.737-5.847-3.973-4.278L1 9.115l1.69-.331 5.712-1.079 2.777-5.173L12 1l.821 1.532 2.777 5.173 5.712 1.079 1.69.33-1.183 1.264-3.985 4.29.737 5.835.229 1.728-1.558-.748L12 18.971l-5.24 2.512-1.558.748zm2.294-3.211l4.106-1.974.398-.184.398.184 4.094 1.974-.58-4.56-.06-.454.314-.319 3.103-3.346-4.444-.846-.446-.086-.206-.404L12 4.959 9.827 9.005l-.218.404-.434.086-4.444.846 3.103 3.346.302.319-.048.454-.592 4.56z"
        fill="currentColor"
      />
    </g>
  </svg>
);
