// Esse arquivo serve para typar os dados e evitar futuros e possíveis bugs, é uma boa prática! 

export interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    stock?: number; //a interrrogação indica que o campo é opcional!
}