const App_Context: string = 'APP_Context';
const Auth_Token: string = 'Auth_Token';

export class StorageService {

    static getItem(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    static setItem(key: string, item: any): any {
        localStorage.setItem(key, item);
    }

    static hasContext(): boolean {
        return !!this.getItem(App_Context);
    }

    static getContext(): any {
        if (this.hasContext()) {
            return this.getItem(App_Context);
        }
    }
    static setContext(context: any) {
        localStorage.setItem(App_Context, context);
    }

    static removeContext(): void {
        localStorage.removeItem(App_Context);
    }

    static hasToken(): boolean {
        return !!this.getItem(Auth_Token);
    }

    static getToken(): string {
        if (this.hasToken()) {
            return this.getItem(Auth_Token);
        }
    }
    static setToken(token: string): void {
        localStorage.setItem(Auth_Token, JSON.stringify(token));
    }
    static removeToken(): void {
        localStorage.removeItem(Auth_Token);
    }
}