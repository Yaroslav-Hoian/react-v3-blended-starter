import type { ContainerProps } from "../../types/photo";
import style from "./Grid.module.css";

export default function Grid({ children }: ContainerProps) {
  return <ul className={style.list}>{children}</ul>;
}
