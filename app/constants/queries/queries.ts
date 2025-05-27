export const fiscalizedThisWeekQuery = `
                        query {
                        getFiscalizedThisWeek{
                            data {
                                id,
                                total,
                                items {
                                    id,
                                    name,
                                    unitPrice,
                                    quantity,
                                    totalPrice
                                },
                                fiscalCode,
                                signature,
                                timestamp,
                                status,
                                paymentType,
                                taxAmount
                            },
                            count
                        }
                        }`

export const pendingThisWeekQuery = `{
    getPendingThisWeek{
        data {
            id,
            total,
            items {
                id,
                name,
                unitPrice,
                quantity,
                totalPrice
            },
            fiscalCode,
            signature,
            timestamp,
            status,
            paymentType,
            taxAmount
        },
        count
    }
}`

export const cancelledThisWeekQuery = ` {
    getCancelledThisWeek{
        data {
            id,
            total,
            items {
                id,
                name,
                unitPrice,
                quantity,
                totalPrice
            },
            fiscalCode,
            signature,
            timestamp,
            status,
            paymentType,
            taxAmount
        },
        count
    }
}
`

export const todayTransactionsQuery = `{
    getTodaysTransactions{
        todayDTOList {
            status,
            count
        }
    }
}
`

export const weeklyByTypeQuery = `{
    getWeeklyByType{
        weeklyByType {
            id,
            label,
            value,
            color
        }
    }
}`
