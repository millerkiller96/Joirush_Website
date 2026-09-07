import NextImage, { type ImageProps } from "next/image";
import { asset } from "@/lib/paths";

export function Image({ src, ...props }: ImageProps) {
  return <NextImage src={typeof src === "string" ? asset(src) : src} {...props} />;
}
