import { Component, OnInit } from '@angular/core';
import { EntityService, Entity, EntityType } from './entity.service';
import { CommonModule } from '@angular/common';
import { EntityComponent } from './entity/entity.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, EntityComponent, FormsModule, NgxChartsModule],
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
})
export class SimulationComponent implements OnInit {
  entities: Entity[] = [];
  winner:EntityType | null = null;
  rockCount: number = 0;
  paperCount: number = 0;
  scissorsCount: number = 0;
  velocityMultiplier: number = 3;
  isRunning: boolean = false;
   chartData = [
    { name: 'Rock', value: this.rockCount },
    { name: 'Paper', value: this.paperCount },
    { name: 'Scissors', value: this.scissorsCount },
  ];

  constructor(private entityService: EntityService) {}

  ngOnInit(): void {
    this.entityService.setSimulationState(false);
  }

  startSimulation():void{
    this.entityService.generateEntities(this.rockCount,this.scissorsCount,this.paperCount);
    this.entities = this.entityService.getEntities();
    this.entityService.setSimulationState(true);
    this.winner = null;

    const interval = setInterval(() => {

      this.entityService.updateEntities(this.velocityMultiplier);
      this.entities = [...this.entityService.getEntities()];
      this.winner = this.entityService.winner;
      this.isRunning = this.entityService.getSimulationState()
      this.chartData = [
        { name: 'Rock', value: this.entityService.getEntityCount("rock") },
        { name: 'Paper', value: this.entityService.getEntityCount("paper") },
        { name: 'Scissors', value: this.entityService.getEntityCount("scissors") },
      ];
      if(!this.isRunning){
        clearInterval(interval);
      }
  
    },30);

    
  }
}
