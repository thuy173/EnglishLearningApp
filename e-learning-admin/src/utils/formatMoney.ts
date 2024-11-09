const units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
const scales = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

function convertLessThanOneThousand(number: number) {
    let result = '';

    const hundreds = Math.floor(number / 100);
    const tensAndUnits = number % 100;

    if (hundreds > 0) {
        result += units[hundreds] + ' trăm ';
        if (tensAndUnits > 0) {
            result += 'lẻ ';
        }
    }

    if (tensAndUnits > 0) {
        if (tensAndUnits < 10) {
            result += units[tensAndUnits];
        } else if (tensAndUnits === 10) {
            result += 'mười';
        } else if (tensAndUnits < 20) {
            result += 'mười ' + (tensAndUnits % 10 === 5 ? 'lăm' : units[tensAndUnits % 10]);
        } else {
            const tensDigit = Math.floor(tensAndUnits / 10);
            const unitsDigit = tensAndUnits % 10;
            result += tens[tensDigit];
            if (unitsDigit > 0) {
                result += ' ' + (unitsDigit === 5 ? 'lăm' : units[unitsDigit]);
            }
        }
    }

    return result.trim();
}

export function convertMoneyToVietnameseWords(number: number) {
    if (number === 0) return 'Không Việt Nam đồng';

    let result = '';
    let scaleIndex = 0;

    while (number > 0) {
        const chunk = number % 1000;
        if (chunk > 0) {
            const chunkWords = convertLessThanOneThousand(chunk);
            result = chunkWords + (scaleIndex > 0 ? ' ' + scales[scaleIndex] + ' ' : '') + result;
        }
        number = Math.floor(number / 1000);
        scaleIndex++;
    }

    result = result.trim() + ' Việt Nam đồng';
    return result.charAt(0).toUpperCase() + result.slice(1);
}
