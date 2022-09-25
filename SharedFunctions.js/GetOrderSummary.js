export function getOrderSummary(itemDetails) {
    let Products = 0;
    let ItemsQty = 0;
    let ItemDisc = 0;
    let SubTotal = 0;
    let TaxAmount = 0;

    Products = itemDetails.length;

    if (itemDetails.length > 0) {
        itemDetails.forEach((item) => {
            ItemsQty += item.Qty;
            SubTotal += item.Qty * item.SalesPrice;
            if (!item.TaxBfrDisc) {
                ItemDisc += (item.SalesPrice * (item.Discount / 100))*item.Qty;
                TaxAmount += ((item.SalesPrice - item.SalesPrice * (item.Discount / 100)) * (taxDetails.TaxRate / 100))*item.Qty;
            }
            else {
                ItemDisc += (item.SalesPrice * (item.Discount / 100))*item.Qty;
                TaxAmount += (item.SalesPrice * (item.TaxRate / 100)) * item.Qty;
            }
        })
    }
    
    return {
        _Products: Products,
        _ItemsQty: ItemsQty,
        _ItemDisc: ItemDisc,
        _SubTotal: SubTotal,
        _TaxAmount: TaxAmount,
    }
}