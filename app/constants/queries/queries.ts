import { gql } from "@apollo/client"

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

export const GET_LATEST_RECEIPTS = gql`
    query getLatestReceipts{
        getLatestReceipts{
            id,
            total,
            timestamp,
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
        }
    }
`

export const GET_LOANS_BY_BORROWER = gql `
    query GetLoansByUserId($id: ID!, $page: Int, $size: Int){
        getLoansByUserId(id: $id, page: $page, size: $size) {
            data{
                id,
                borrowerId,
                status,
                amount,
                interestRate
            }}
        }
`