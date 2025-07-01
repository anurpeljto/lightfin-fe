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
    query GetLoansByUserId($id: ID!, $page: Int, $size: Int, $filterBy: String, $sortBy: String){
        getLoansByUserId(id: $id, page: $page, size: $size, filterBy: $filterBy, sortBy: $sortBy) {
            data{
                id,
                borrowerId,
                status,
                amount,
                interestRate
            }}
        }
`

export const GET_USER_BY_ID = gql `
    query GetUserById($id: Int!){
        getUserById(id: $id){
            id,
            first_name,
            last_name,
            email
        }
    }`

export const GET_USERS = gql `
    query ListUsers($page: Int, $size: Int){
        listUsers(page: $page, size: $size){
            id,
            first_name,
            last_name,
            email
        }
    }
`

export const SEARCH_USER = gql `
    query SearchUsers($searchTerm: String, $page: Int, $size: Int){
        searchUsers(searchTerm: $searchTerm, page: $page, size: $size){
            id,
            first_name,
            last_name,
            email
        }
    }
`

export const SEARCH_LOANS = gql `
    query SearchLoans($page: Int, $size: Int, $filterBy: String, $sortBy: String){
        searchLoans(page: $page, size: $size, filterBy: $filterBy, sortBy: $sortBy){
            id,
            borrower_id,
            status,
            amount,
            interestRate
        }
    }
`

export const GET_SUBSIDIES_USER = gql `
    query GetSubsidiesByUserId($id: ID!, $page: Int, $size: Int, $filterBy: String, $sortBy: String){
        getSubsidiesByUserId(id: $id, page: $page, size: $size, filterBy: $filterBy, sortBy: $sortBy){
            content {
                id,
                recipientId,
                amount,
                grant {
                    id,
                    name
                },
                approvalDate,
                validUntil,
                status
            },
            totalPages,
            totalElements,
            numberOfElements,
            size
        }
    }
`

export const APPROVE_SUBSIDY = gql `
    mutation ApproveSubsidy($id: ID!){
        approveSubsidy(id: $id){
            id,
            recipientId,
            status,
            amount
        }
    }
`

export const GET_SUBSIDIES = gql `
    query ListSubsidies($page: Int, $size: Int){
        listSubsidies(page: $page, size: $size){
            content {
                id,
                recipientId,
                amount,
                grant {
                    id,
                    name
                },
                approvalDate,
                validUntil,
                status,
                grant {
                    id,
                    name,
                    grantingAuthority,
                    description
                }
            },
            totalPages,
            totalElements,
            numberOfElements
        }
    }
`

export const GET_PENDING_SUBSIDIES = gql `
    query GetPendingSubsidies($page: Int, $size: Int){
        getPendingSubsidies(page: $page, size: $size){
            totalElements
        }
    }
`

export const GET_WEEKLY_SUBSIDIES = gql `
    query GetWeeklySubsidies($page: Int, $size: Int){
        getWeeklySubsidies(page: $page, size: $size){
            totalElements
        }
    }
`

export const GET_TODAY_TRANSACTIONS_COUNT = gql `
    query GetTodaysTransactionsCount{
        getTodaysTransactionsCount
    }
`

export const GET_WEEK_TRANSACTIONS_COUNT = gql `
    query GetWeeklyTransactionsCount{
        getWeeklyTransactionsCount
    }
`

export const GET_MONTH_TRANSACTIONS_COUNT = gql `
    query GetMonthlyTransactionsCount{
        getMonthlyTransactionsCount
    }
`