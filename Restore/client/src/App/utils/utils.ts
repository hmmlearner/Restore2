export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function formatCurrency(price: number) {
    const fPrice = '$' + (price / 100).toFixed(2);
    return fPrice;
}