import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
  <div class="header bg-slate-100 w-full px-4 py-3 shadow-md justify-between flex items-center">
      <span class="text-xl">Header</span>
      
  </div>
  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
