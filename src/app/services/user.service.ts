import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private users: User[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com',
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@example.com',
      createdAt: new Date()
    }
  ];

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: Math.max(...this.users.map(u => u.id)) + 1,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return of(newUser);
  }
}