export const GetItemDetails = (itemDetails) => {
    let Products = itemDetails.length;
    let ItemsQty = 0;
    let ItemDisc = 0;
    let SubTotal = 0;
    let TaxAmount = 0;


    if(itemDetails.length > 0) {
        itemDetails.forEach((item) => {
            ItemsQty += item.Qty;
            SubTotal += item.Qty * item.SalesPrice;
            if(!item.TaxBfrDisc) {
                ItemDisc += item.SalesPrice * (item.Discount / 100);
                TaxAmount += (item.SalesPrice - item.SalesPrice * (item.Discount / 100)) * (taxDetails.TaxRate / 100);
            }
            else {
                ItemDisc += item.SalesPrice * (item.Discount / 100);
                TaxAmount += item.SalesPrice * (item.TaxRate / 100);
            }
        })
    }

    const details = {
        Products: Products,
        ItemsQty: ItemsQty,
        ItemDisc: ItemsQty,
        SubTotal: SubTotal,
        TaxAmount: TaxAmount,
    }
    
    return details;

}