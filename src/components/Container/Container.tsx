import styled from "./Container.module.css";
import type { ContainerProps } from "../../types/photo";

export default function Container({ children }: ContainerProps) {
  return <div className={styled.container}>{children}</div>;
}
