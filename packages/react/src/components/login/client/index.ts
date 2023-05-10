import { UserManager, UserManagerSettings, SigninRedirectArgs, SignoutRedirectArgs, User } from 'oidc-client-ts';

import { ConnectedModule, SignalNamespace } from '../beacon/beacon';
import { OidcClientError } from './oidcClientError';

export type LoginProps = {
  language?: string;
} & SigninRedirectArgs;

export type LogoutProps = {
  language?: string;
} & SignoutRedirectArgs;

export type OidcClientProps = {
  userManagerSettings: Partial<UserManagerSettings>;
  debug?: boolean;
};

export type UserReturnType = User | null;
export type ErrorReturnType = OidcClientError | null;
export type RenewalResult = [ErrorReturnType, UserReturnType];

export type OidcClientState = 'NO_SESSION' | 'VALID_SESSION' | 'LOGGING_IN' | 'LOGGING_OUT' | 'HANDLING_LOGIN_CALLBACK';

export interface OidcClient extends ConnectedModule {
  /**
   * Returns current state
   */
  getState: () => OidcClientState;
  /**
   * Returns user object or null
   */
  getUser: () => UserReturnType;
  /**
   * Returns the client's UserManager
   */
  getUserManager: () => UserManager;
  /**
   * Handles the callback path and returns an user object - if user is valid
   */
  handleCallback: () => Promise<User>;
  /**
   *
   * Returns true if user renewal is in progress
   */
  isRenewing: () => boolean;
  /**
   * Calls the authorization_endpoint with given parameters
   * Browser window is redirected, the returned promise never fulfills
   */
  login: (props?: LoginProps) => Promise<void>;
  /**
   * Calls the end_session_endpoint with given parameters
   * Browser window is redirected, the returned promise never fulfills
   */
  logout: (props?: LogoutProps) => Promise<void>;
  /**
   *
   * For manual user renewal.
   * The Promise will never reject.
   */
  renewUser: () => Promise<RenewalResult>;
}

export const oidcClientNamespace: SignalNamespace = 'oidcClient';
