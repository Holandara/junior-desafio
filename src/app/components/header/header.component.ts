import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-header',
  imports: [TooltipModule],
  standalone: true,
  template: `
  <div class="header bg-slate-100 w-full px-4 py-3 shadow-md justify-between flex items-center">
      <span  class="px-5 text-xl  font-bold bg-gradient-to-r from-blue to-green inline-block text-transparent bg-clip-text">Gestão de usuários</span>
      
  </div>
  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
