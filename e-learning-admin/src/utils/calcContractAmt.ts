import { TimeUnitText } from "@/enums/timeUnit";
import { CarePriceRes } from "@/models/carePrice";
import { MovingPriceRes } from "@/models/movingPrice";
import { NichePriceRes } from "@/models/nichePrice";
import { ProductPriceRes } from "@/models/productPrice";

const calcCareAmt = (carePrice: CarePriceRes, sendName: string, qtyDeceased: number, isLongSend: boolean) => {
    const partsSend = sendName.split(' ')
    const numTimeSend = parseInt(partsSend[0])
    let tendPrice = carePrice.price

    const timeType = sendName as TimeUnitText
    if (timeType === TimeUnitText.YEAR && isLongSend) {
        tendPrice *= numTimeSend === 1 ? 1 : (numTimeSend - 1)
    } else {
        tendPrice *= numTimeSend
    }

    return tendPrice * qtyDeceased
}

export const calcContractAmt = ({
    carePrice,
    storageName,
    isLondSend,
    movingPrice,
    nichePrices,
    qtyDeceased,
    products,
    formAmt,
}: {
    carePrice: CarePriceRes;
    storageName: string;
    isLondSend: boolean;
    movingPrice: MovingPriceRes;
    nichePrices: NichePriceRes[];
    qtyDeceased: number;
    products: ProductPriceRes[];
    formAmt: number;
}) => {
    const movingAmt = movingPrice.price * qtyDeceased
    const nicheAmt = nichePrices.reduce((sum, item) => sum + item.price, 0)
    const productAmt = products.reduce((sum, item) => sum + item.price, 0)
    return formAmt > 0 ? formAmt : calcCareAmt(carePrice, storageName, qtyDeceased, isLondSend) + movingAmt + productAmt + nicheAmt
}