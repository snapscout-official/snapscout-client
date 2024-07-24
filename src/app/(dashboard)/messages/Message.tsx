import { type ReactElement } from "react";

type MessageProps = {
  content: string;
};
export function Message({ content }: MessageProps): ReactElement {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
}
