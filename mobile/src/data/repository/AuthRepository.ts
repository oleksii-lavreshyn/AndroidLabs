import type { BackendApi } from '../remote/backendApi';
import type { UserDao } from '../local/daos/UserDao';
import { SecureStorage } from '@/utils/SecureStorage';
export class AuthRepository { constructor(private api:BackendApi,private dao:UserDao){} async login(username:string){const value=username.trim();if(!value)throw new Error("Введіть ім'я");const result=await this.api.login(value);await SecureStorage.set('sessionToken',result.token);await this.dao.addLogin(value);return result.user;} logout(){return SecureStorage.delete('sessionToken');} }
