import { menShoes } from "./menShoes";
import { womenShoes} from "../Shoes/womenShoes";
import dropShoes from "../Shoes/dropShoes";
import { lace } from "./lace";
import { womenRunning } from "./womenRunning";
import { menRunning } from "./menRunning";
export const allProduct = [
    ...menShoes,
    ...womenShoes,
    ...dropShoes,
    ...lace,
    ...womenRunning,
    ...menRunning
]