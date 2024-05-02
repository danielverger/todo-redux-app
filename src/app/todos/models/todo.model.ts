

export class Todo {
  public id: number;
  public texto: string;
  public completado: boolean;

  constructor(texto:string, completado?:boolean) {
    this.texto = texto;
    this.id = Math.random();
    this.completado = completado || false;
  }
}