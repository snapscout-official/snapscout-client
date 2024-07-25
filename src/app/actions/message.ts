"use server";
export async function deliverMessage(message: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  console.log("sending message");
  return message;
}
