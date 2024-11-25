import { Component, OnInit } from '@angular/core';
import { EntityService, Entity, EntityType } from './entity.service';
import { CommonModule } from '@angular/common';
import { EntityComponent } from './entity/entity.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, EntityComponent, FormsModule],
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
      console.log(this.velocityMultiplier);
      this.entityService.updateEntities(this.velocityMultiplier);
      this.entities = [...this.entityService.getEntities()];
      this.winner = this.entityService.winner;
      this.isRunning = this.entityService.getSimulationState()
      if(!this.isRunning){
        clearInterval(interval);
      }
  
    },30);

    
  }
}
