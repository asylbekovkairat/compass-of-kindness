import { ApiResponseData, api } from '~shared/api';
import { setAsyncTimeout } from '~shared/lib/utils';

import { routes } from './routes';
import { ApiSignInData, ApiSignInResponseData } from './types';

export const signIn = async (data: ApiSignInData) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiSignInResponseData>>(routes.signIn(), {
      login: data.login,
      password: data.password,
    });

    const tokenType = response.data.tokenType;
    const tokenRes = response.data.token;
    const ttl = response.data.authState.exp;
    const token = `${tokenType} ${tokenRes}`;
    // LocalStorageCache.set(import.meta.env.VITE_TOKEN_NAME, token, ttl);
    localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, JSON.stringify(token));
    localStorage.setItem(import.meta.env.VITE_TOKEN_TTL, JSON.stringify(ttl));
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};

export const externalSignIn = async (externalToken: string) => {
  let response;

  try {
    response = await api.post<any, ApiResponseData<ApiSignInResponseData>>(
      routes.externalSignIn(),
      {},
      {
        params: {
          token: externalToken,
        },
      }
    );

    const tokenType = response.data.tokenType;
    const tokenRes = response.data.token;
    const ttl = response.data.authState.exp;
    const token = `${tokenType} ${tokenRes}`;
    // LocalStorageCache.set(import.meta.env.VITE_TOKEN_NAME, token, ttl);
    localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, JSON.stringify(token));
    localStorage.setItem(import.meta.env.VITE_TOKEN_TTL, JSON.stringify(ttl));
  } catch (error: any) {
    response = error?.response?.data;
  }

  return response;
};

export const mockSignIn = async (_data?: ApiSignInData) => {
  let result: unknown = null;

  await setAsyncTimeout(() => {
    result = {
      data: {
        token: 'token',
        expiresIn: 120,
        type: 'Bearer',
      },
    };
  }, 1000);

  return result as ApiResponseData<ApiSignInResponseData>;
};
