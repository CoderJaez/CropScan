import { RiceLeaf } from "./types";

export const screens = {
    camera:'Camera',
    rice_leaf:'RiceLeaf',

}
export type RootStackParamList = {
    Camera:undefined;
    RiceLeaf:RiceLeaf|undefined;
}
export type MenuScreen ={
    id:number;
    label:string;
    screenName:keyof RootStackParamList
}

