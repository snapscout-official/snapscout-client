import { useState } from "react";
import { Quote } from "../(dashboard)/canvass/RequestQuote";
import { usePathname } from "next/navigation";

export function useQuotes(
  productName: string,
): [Quote[] | undefined, (quote: Quote) => void] {
  const pathname = usePathname();
  const [quotes, setQuotes] = useState<Quote[] | undefined>(
    window.history.state?.[productName],
  );
  function setMyQuotes(quote: Quote) {
    try {
      if (!quotes) {
        const pushData = [quote];
        window.history.replaceState({ [productName]: pushData }, "", pathname);
        setQuotes(pushData);
        return;
      }
      const exists = quotes.find(
        (quoteItem: Quote) => quoteItem.productId === quote.productId,
      );
      if (!exists) {
        const pushData = [...quotes, quote];
        window.history.replaceState({ [productName]: pushData }, "", pathname);
        setQuotes(pushData);
        return;
      }
      const filter = quotes.filter(
        (quote: Quote) => quote.productId !== exists.productId,
      );
      const pushData = [
        ...filter,
        { ...exists, quantity: exists.quantity + quote.quantity },
      ];
      window.history.replaceState({ [productName]: pushData }, "", pathname);
      setQuotes(pushData);
    } catch (err) {
      throw new Error("Error adding new quote");
    }
  }
  return [quotes, setMyQuotes];
}
