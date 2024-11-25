import { Component, Input } from '@angular/core';
import { Entity } from '../entity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="entity"
      [ngClass]="entity.type"
      [style.left.px]="entity.x"
      [style.top.px]="entity.y"
    ></div>
  `,
  styleUrls: ['./entity.component.css'],
})
export class EntityComponent {
  @Input() entity!: Entity;
}
