import { RiceLeaf } from "./types";

export const screens = {
    camera: 'Camera',
    rice_leaf: 'RiceLeaf',
    home: 'Home',
    about: 'About'

}
export type RootStackParamList = {
    Camera: undefined;
    RiceLeaf: RiceLeaf | undefined;
    Home: undefined;
    About: undefined;
}
export type MenuScreen = {
    id: number;
    label: string;
    screenName: keyof RootStackParamList
}

