import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  imports: [],
  template: `<p>user-list works!</p>`,
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent { }
