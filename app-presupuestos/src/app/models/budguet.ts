export class Budguet{
    constructor (
        public id: number,
        public user_id:number,
        public number_budguet:number,
        public client_id: number,
        public name: string,
        public description: string,
        public price: number,
        public tax: number,
        public total: number,
    ){}
}