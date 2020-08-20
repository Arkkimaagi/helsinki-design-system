import React, {
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { animated, useTransition, UseTransitionProps } from 'react-spring';

import styles from './Navigation.module.css';
import classNames from '../../utils/classNames';
import Logo, { LogoLanguage } from '../logo/Logo';
import NavigationContext, { NavigationContextProps } from './NavigationContext';
import NavigationRow from './navigation-row/NavigationRow';
import NavigationItem from './navigation-item/NavigationItem';
import NavigationActions from './navigation-actions/NavigationActions';
import NavigationUser from './navigation-user/NavigationUser';
import NavigationSearch from './navigation-search/NavigationSearch';
import NavigationLanguageSelector from './navigation-language-selector/NavigationLanguageSelector';
import NavigationDropdown from './navigation-dropdown/NavigationDropdown';
import useMobile from '../../hooks/useMobile';
import IconCross from '../../icons/ui/IconCross';
import IconMenuHamburger from '../../icons/ui/IconMenuHamburger';
import { NavigationReducerAction, NavigationReducerState } from './Navigation.interface';

const MOBILE_MENU_TRANSITION: UseTransitionProps = {
  from: { transform: 'translate3d(0, -10%, 0)', opacity: 0.85 },
  enter: { transform: 'translate3d(0, 0%, 0)', opacity: 1 },
  config: {
    friction: 30,
    tension: 300,
  },
};

export type NavigationProps = PropsWithChildren<
  {
    /**
     * If `true`, the mobile menu will be animated when opened
     * @default true
     */
    animateOpen?: boolean;
    /**
     * Additional class names to apply to the navigation
     */
    className?: string;
    /**
     * If `true`, the navigation will be fixed to the top of the page
     * @default false
     */
    fixed?: boolean;
    /**
     * ID of the header element
     */
    id?: string;
    /**
     * The language of the Helsinki-logo
     * @default 'fi'
     */
    logoLanguage?: LogoLanguage;
    /**
     * aria-label for the mobile menu toggle when the menu is open
     */
    menuCloseAriaLabel: string;
    /**
     * Sets whether the mobile menu is open. Used together with the `onMenuToggle` prop to override the internal state handling
     * @default false
     */
    menuOpen?: boolean;
    /**
     * aria-label for the mobile menu toggle when the menu is closed
     */
    menuOpenAriaLabel: string;
    /**
     * Callback fired when the mobile menu is toggled. Can be used together with the `menuOpen` prop to override the internal state handling
     */
    onMenuToggle?: () => void;
    /**
     * Callback fired when the title or logo is clicked
     */
    onTitleClick?: () => void;
    /**
     * ID of the element to jump to when the "skip to content" accessibility shortcut is clicked
     */
    skipTo: string;
    /**
     * aria-label for the "skip to content" accessibility shortcut
     */
    skipToContentAriaLabel?: string;
    /**
     * Text for the "skip to content" accessibility shortcut
     */
    skipToContentText: string | ReactNode;
    /**
     * Defines the navigation theme
     * @default 'white'
     */
    theme?: 'white' | 'black';
    /**
     * The title of the service shown next to the logo
     */
    title?: string;
    /**
     * URL to navigate to when the logo or title is clicked
     */
    titleUrl?: string;
  } & Omit<NavigationContextProps, 'isMobile'>
>;

/**
 * Rearranges children, so that they are displayed in the correct order in the mobile menu
 * @param {ReactElement[]} children
 * @param {boolean} authenticated
 */
const rearrangeChildrenForMobile = (children: ReactElement[], authenticated: boolean): ReactElement[] => {
  const rearrangedChildren = [...children];

  // moves the component to the start of the array
  const moveComponentToTop = (name: string) => {
    const index = rearrangedChildren.findIndex((item) => (item?.type as FC)?.name === name);
    if (index > -1) {
      const component = rearrangedChildren.splice(index, 1)[0];
      rearrangedChildren.splice(0, 0, component);
    }
  };

  // move search to top
  moveComponentToTop('NavigationSearch');
  // move sign in button to top if user isn't authenticated
  if (!authenticated) moveComponentToTop('NavigationUser');

  return rearrangedChildren;
};

/**
 * Navigation reducer
 * @param {ReducerState} state
 * @param {ReducerAction} action
 */
const reducer = (state: NavigationReducerState, action: NavigationReducerAction): NavigationReducerState => {
  if (action.type === 'AUTHENTICATED') {
    return { ...state, authenticated: action.value };
  }
  if (action.type === 'NAVIGATION_ROW') {
    return { ...state, navigationRowDisplay: action.value };
  }

  return state;
};

/**
 * Wrapper component for header content
 * @param children
 * @param logoLanguage
 * @param onTitleClick
 * @param title
 * @param titleUrl
 * @param mobileMenuOpen
 */
const HeaderWrapper = ({ children, logoLanguage, onTitleClick, title, titleUrl }) => (
  <div className={styles.headerBackgroundWrapper}>
    <div className={styles.headerContainer}>
      <a
        className={styles.title}
        href={titleUrl}
        onClick={onTitleClick}
        {...(!titleUrl && onTitleClick && { tabIndex: 0 })}
      >
        <Logo dataTestId="test" className={styles.logo} language={logoLanguage} />
        {title && <span>{title}</span>}
      </a>
      {children}
    </div>
  </div>
);

const Navigation = ({
  animateOpen = true,
  children,
  className,
  fixed = false,
  id,
  logoLanguage = 'fi',
  menuCloseAriaLabel,
  menuOpen = false,
  menuOpenAriaLabel,
  onMenuToggle,
  onTitleClick,
  skipTo,
  skipToContentAriaLabel,
  skipToContentText,
  theme = 'white',
  title,
  titleUrl,
}: NavigationProps) => {
  const isMobile = useMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(menuOpen);

  const [{ authenticated, navigationRowDisplay }, dispatch] = useReducer(reducer, {
    authenticated: false,
    navigationRowDisplay: 'fullWidth',
  });

  // close menu when changing between mobile and desktop
  useEffect(() => setMobileMenuOpen(false), [isMobile]);
  // set the menu open state when it's controlled by the prop
  useEffect(() => setMobileMenuOpen(menuOpen), [menuOpen]);

  // navigation context
  const context = { dispatch, isMobile, theme };
  // ensure that children is an array
  const childrenAsArray = Children.toArray(children) as ReactElement[];
  // children without the navigation row
  const childrenWithoutNavigation = childrenAsArray.filter((child) => (child.type as FC)?.name !== 'NavigationRow');
  // filter out the NavigationRow, so that it can be rendered correctly based on the 'navigationRowDisplay' value
  const navigation = childrenAsArray.filter((child) => (child.type as FC)?.name === 'NavigationRow');

  // children that will be rendered in the mobile menu
  let menuChildren = null;

  if (isMobile) {
    // navigation actions
    const actions = childrenAsArray.find((child) => (child.type as FC).name === 'NavigationActions')?.props?.children;
    const items = Children.toArray([navigation, actions]) as ReactElement[];

    // rearrange children
    menuChildren = rearrangeChildrenForMobile(items, authenticated);
  }

  // mobile menu transition
  const transitionProps = animateOpen ? MOBILE_MENU_TRANSITION : {};
  const mobileMenuTransition = useTransition<boolean, UseTransitionProps>(mobileMenuOpen, transitionProps);

  // props for the header wrapper component
  const headerWrapperProps = { logoLanguage, onTitleClick, title, titleUrl };

  return (
    <NavigationContext.Provider value={context}>
      <header
        id={id}
        className={classNames(
          styles.header,
          fixed && styles.fixed,
          mobileMenuOpen && styles.menuOpen,
          !title && styles.noTitle,
          `${styles[`theme-${theme}`]} theme-${theme}`,
          className,
        )}
      >
        <a className={styles.skipToContent} href={skipTo} aria-label={skipToContentAriaLabel}>
          {skipToContentText}
        </a>
        {isMobile ? (
          <>
            <HeaderWrapper {...headerWrapperProps}>
              <button
                type="button"
                className={styles.mobileMenuToggle}
                onClick={() =>
                  typeof onMenuToggle === 'function' ? onMenuToggle() : setMobileMenuOpen(!mobileMenuOpen)
                }
              >
                {mobileMenuOpen ? (
                  <IconCross aria-label={menuCloseAriaLabel} />
                ) : (
                  <IconMenuHamburger aria-label={menuOpenAriaLabel} />
                )}
              </button>
            </HeaderWrapper>
            {mobileMenuTransition(
              (values, open) =>
                open && (
                  <animated.div className={styles.mobileMenu} style={values}>
                    {menuChildren}
                  </animated.div>
                ),
            )}
          </>
        ) : (
          <>
            <HeaderWrapper {...headerWrapperProps}>
              {navigationRowDisplay === 'inline' && <div className={styles.headerContent}>{children}</div>}
              {navigationRowDisplay === 'fullWidth' && (
                <div className={styles.headerContent}>{childrenWithoutNavigation}</div>
              )}
            </HeaderWrapper>
            {navigationRowDisplay === 'fullWidth' && navigation}
          </>
        )}
      </header>
    </NavigationContext.Provider>
  );
};

Navigation.Actions = NavigationActions;
Navigation.Dropdown = NavigationDropdown;
Navigation.Item = NavigationItem;
Navigation.LanguageSelector = NavigationLanguageSelector;
Navigation.Row = NavigationRow;
Navigation.Search = NavigationSearch;
Navigation.User = NavigationUser;

export default Navigation;
