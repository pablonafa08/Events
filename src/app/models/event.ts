export class Event{
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public date: string,
        public image: string,
        public attendances: number,
        public willYouAttend: boolean,
        public location: [number,number]
    ){

    }
}