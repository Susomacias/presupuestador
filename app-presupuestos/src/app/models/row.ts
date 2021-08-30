export class Row{//CADA LINEA DE UN PRESUPUESTO
    constructor (
        public id: number,
        public user_id:number,
        public budguet_id: number,
        public amount: number,
        public name: string,
        public description: string,
        public price: number,
        public tax: number,
        public total: number,
    ){}
}