import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
export class Http {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
  // read
  get<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params" | "method" | "url">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "GET",
    });
  }
  // create
  post<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "url" | "method" | "data">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "POST",
    });
  }
  // update
  patch<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "url" | "data">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "PATCH",
    });
  }
  // destroy
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params">
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: "DELETE",
    });
  }
}

export const http = new Http("/api/v1");
