import type { ContainerProps } from "../../types/photo";
import style from "./Section.module.css";

export default function Section({ children }: ContainerProps) {
  return <section className={style.section}>{children}</section>;
}
