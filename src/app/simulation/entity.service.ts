import { Injectable } from '@angular/core';

export type EntityType = 'rock' | 'paper' | 'scissors';

export interface Entity {
  id: number;
  type: EntityType;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private entities: Entity[] = [];
  private isSimulationRunning = false;
  entityCounter = 0;
  rules: Record<EntityType, EntityType> = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock',
  };
  winner : EntityType | null = null;


  getEntities(): Entity[] {
    return this.entities;
  }

  setSimulationState(state:boolean){
    this.isSimulationRunning = state;
  }

  getSimulationState(): boolean{
    return this.isSimulationRunning;
  }

  private addEntities(type: EntityType, count : number): void{
    for(let i = 0; i< count; i++){
      const entity: Entity = {
        id: this.entityCounter++,
        type,
        x: Math.random() * 770,
        y: Math.random() * 570,
        velocityX: (Math.random() - 0.5) * 3,
        velocityY: (Math.random() - 0.5) * 3,
      };
      this.entities.push(entity)
    }
  }

  generateEntities(rockCount:number, scissorsCount:number, paperCount:number): void {
    this.entities = [];
    this.addEntities('rock', rockCount);
    this.addEntities('paper',paperCount);
    this.addEntities('scissors',scissorsCount)
  }



  updateEntities(velocityMultiplier:number = 1): void {
    console.log('isSimulationRunning:', this.isSimulationRunning);
    if (!this.isSimulationRunning) return;

    this.entities.forEach((entity) => {
      entity.x += entity.velocityX * velocityMultiplier;
      entity.y += entity.velocityY * velocityMultiplier;

      if (entity.x <= 0 || entity.x >= 770) entity.velocityX *= -1;
      if (entity.y <= 0 || entity.y >= 570) entity.velocityY *= -1;
    });

    this.checkCollisions();
    this.checkForWinner();
  }

  private checkCollisions(): void {
    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        const entity1 = this.entities[i];
        const entity2 = this.entities[j];

        if (this.isColliding(entity1, entity2)) {
          const winner1 = this.rules[entity1.type] === entity2.type; 
          const winner2 = this.rules[entity2.type] === entity1.type; 
        
          if (winner1) {
            entity2.type = entity1.type; 
          } else if (winner2) {
            entity1.type = entity2.type; 
          }
        }
      }
    }
  }

  private isColliding(entity1: Entity, entity2: Entity): boolean {
    const distance = Math.sqrt(
      Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2)
    );
    return distance < 30;
  }

  private checkForWinner(){
    const firstType = this.entities[0].type;
    const allTheSame = this.entities.every(e => e.type == firstType);

    if(allTheSame){
      this.isSimulationRunning = false;
      this.winner = firstType;
    }
       
  }

}
