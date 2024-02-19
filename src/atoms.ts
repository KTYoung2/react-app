import { atom } from "recoil";


// 아톰을 생성하기 위해선 고유key ,  default value 설정 필요 
export const isDarkAtom = atom({
    key : "isDark",
    default : false,
});