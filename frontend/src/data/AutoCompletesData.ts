import GetCustomer from "@/features/dashboard/hooks/GetCustomer"
import { Customers } from "./DashboardCustomers"
import { formPayMethod } from "@/types/methods"


export interface CustomersUsernameAndId {
    id: string | number
    username: string
}

export const CustomersDataAutoComplete: Array<CustomersUsernameAndId> = Customers.map(customer => {
    return {
        id: customer.id, username: customer.username
    }
})

export const SelectedCustomersDebts = (id: string | number) => {
    const { payeds } = GetCustomer(id);
 
    return payeds
}

export const methodsAutocomplete: Array<formPayMethod> = [
    { id: 1, name: "کارت", value: 'card' },
    { id: 2, name: "درگاه", value: 'bankTransfer' },
    { id: 3, name: "نقد", value: 'cash' },
]

export const installmentTime: Array<{ id: number, name: string, value: string }> = [
    { id: 1, name: "روزانه", value: "daily" },
    { id: 2, name: "هفتگانی", value: "weekly" },
    { id: 3, name: "ماهانه", value: "monthly" },
]


export const Units: Array<{ id: number, name: string, value: string }> = [
    { id: 1, name: "عدد", value: "number" },
    { id: 2, name: "کیلو", value: "kg" },
    { id: 3, name: "بسته", value: "pack" },
    { id: 4, name: "بطری", value: "bottle" },
    { id: 5, name: "قوطی", value: "can" },
    { id: 6, name: "گالن", value: "gallon" }
]