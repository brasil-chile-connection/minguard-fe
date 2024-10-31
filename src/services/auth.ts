// eslint-disable-next-line import/no-cycle
import api from './api';

export type User = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
};

interface AuthData {
  token: string | null;
  roles: number[] | null;
  userId: number | string | null;
}

const AUTH_KEY = '@ucorp-Auth';
const USER_INFO_KEY = '@ucorp-UserInfo';

class Auth {
  private static getAuthData = (): AuthData => {
    const data = localStorage.getItem(AUTH_KEY);
    if (data) {
      return JSON.parse(data) as AuthData;
    }
    return { token: null, roles: null, userId: null };
  };

  private static setAuthData = (data: AuthData): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  };

  public static isAuthenticated = async (): Promise<boolean> => {
    try {
      const { status } = await api.get('/user/me');
      return status !== 403;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  public static hasRole = (): boolean => {
    const authData = this.getAuthData();
    return authData.roles !== null;
  };

  public static checkRole = (role: number): boolean => {
    const authData = this.getAuthData();
    return authData.roles !== null && authData.roles.includes(role);
  };

  public static getToken = (): string | null => {
    const authData = this.getAuthData();
    return authData.token;
  };

  public static clearToken = (): void => {
    const authData = this.getAuthData();
    this.setAuthData({ ...authData, token: null });
  };

  public static getRoles = (): number[] | null => {
    const authData = this.getAuthData();
    return authData.roles;
  };

  public static getUserId = (): number | string | null => {
    const authData = this.getAuthData();
    return authData.userId;
  };

  public static storeUserInfo = (
    id: number,
    firstName: string | null,
    lastName: string | null,
    email: string,
    role: string,
  ): void => {
    const userInfo: User = { id, firstName, lastName, email, role };
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  };

  public static setUserInfo = (userInfo: User): void => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  };

  public static getUserInfo = (): User | null => {
    const data = localStorage.getItem(USER_INFO_KEY);
    if (data) {
      return JSON.parse(data) as User;
    }
    return null;
  };

  public static updateUserEmail = (email: string): void => {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      userInfo.email = email;
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    }
  };

  public static signIn = (
    token: string,
    roles: number[] | null,
    userId: number | null,
  ): void => {
    const authData: AuthData = { token, roles, userId };
    this.setAuthData(authData);
  };

  public static signOut = (): void => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_INFO_KEY);
    window.location.href = '/';
  };
}

export default Auth;
