import DashboardContainer from "@/componentUtils/DashboardContainer";
import ConversationList from "./ConversationList";
import MessageBox from "./MessageBox";
type MessagesProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function Messages({ searchParams }: MessagesProps) {
  //we can fetch the conversation right here
  return (
    <DashboardContainer>
      <div className="grid grid-cols-12">
        <ConversationList />
        <MessageBox
          initialMessages={[
            {
              content: "Hello",
              creator: 1,
              sending: false,
            },
            {
              content: "Hello",
              creator: 1,
              sending: false,
            },
            {
              content: "Testing",
              creator: 1,
              sending: false,
            },
          ]}
        />
      </div>
    </DashboardContainer>
  );
}
