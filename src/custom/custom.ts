class CustomTS {
    convertToRP = (amount: number) => {
        const formattedAmount = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
        const result = formattedAmount.replace('Rp', 'Rp.');
        return result
    }
}

export default CustomTS
