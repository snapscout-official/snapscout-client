function handleAddQuote() {
  try {
    const quoteData = formSchema.parse(form.getValues());
    if (!quotes) {
      const pushData = [{ ...quoteData, productId: currentProduct._id }];
      window.history.replaceState(
        { [currentProduct._id]: pushData },
        "",
        pathname,
      );
      setQuotes(pushData);
      return;
    }
    const exists = quotes.find(
      (quote: Quote) => quote.productId === currentProduct._id,
    );
    if (!exists) {
      const pushData = [
        ...quotes,
        { ...quoteData, productId: currentProduct._id },
      ];
      window.history.replaceState(
        { [currentProduct._id]: pushData },
        "",
        pathname,
      );
      setQuotes(pushData);
      return;
    }
    const filter = quotes.filter(
      (quote: Quote) => quote.productId !== exists.productId,
    );
    const pushData = [
      ...filter,
      { ...exists, quantity: exists.quantity + quoteData.quantity },
    ];
    window.history.replaceState(
      { [currentProduct._id]: pushData },
      "",
      pathname,
    );
    setQuotes(pushData);
  } catch (err) {
    toast({
      title: "Something went wrong",
      description: "something went wrong during processing the input",
      variant: "destructive",
    });
  }
}
