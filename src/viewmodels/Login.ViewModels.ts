import router from '@/router';

export default class LoginViewModel {
   login(username: string, password: string): void {
      if (username === 'admin' && password === 'admin') {
         sessionStorage.setItem('username', username);
         router.push('/');
      } else alert('Wrong account');
   }
}
