import type { ContainerProps } from "../../types/photo";
import style from "./GridItem.module.css";

export default function GridItem({ children }: ContainerProps) {
  return <li className={style.item}>{children}</li>;
}
