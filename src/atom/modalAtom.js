import { atom } from "recoil";
export const modalState = atom({
    key:'modalstate',
    default:false
})

export const postIdState = atom({
    key:'postIdState',
    default:'id'
})