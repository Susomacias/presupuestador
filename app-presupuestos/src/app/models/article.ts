export class Article{
    constructor (
        public id: number,
        public user_id:number,
        public department_id: number,
        public category_id: number,
        public name: string,
        public description: string,
        public favorite: string
    ){}
}
