import { defineStore } from "pinia";
import { CART_STORAGE } from "../composables/usePersistCart";
import { useProductStore } from "./product";


export const useCartStore = defineStore('CartStore', {
    state: () => {
        return {
            contents: JSON.parse(localStorage.getItem(CART_STORAGE)) ?? {}
        }
    },
    getters: {
        count() {
            debugger
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].quantity
            }, 0)
        },
        total() {
            const products = useProductStore()
            // here there is a bug if the u have not loaded the products by going into the page home before coming here then products.items is empty
            // that however should be solved by using the load methods somewehere parent to cart
            return Object.keys(this.contents).reduce((acc, id) => {
                // multiply the accumulater with the price of every product with the quantity
                return acc + products.items[id].price * this.contents[id].quantity;
            }, 0)
        },
        formattedCart() {
            const products = useProductStore()

            if (!products.loaded) return []

            return Object.keys(this.contents).map((productId) => {
                const purchase = this.contents[productId]

                return {
                    id: purchase.productId,
                    image: products.items[purchase.productId].image,
                    title: products.items[purchase.productId].title,
                    quantity: purchase.quantity,
                    price: products.items[purchase.productId].price,
                    cost: purchase.quantity * products.items[purchase.productId].price,
                    category: products.items[purchase.productId].category,
                    description: products.items[purchase.productId].description,
                    rating: products.items[purchase.productId].rating
                }
            })
        }
    },
    actions: {
        add(productId) {
            if (this.contents[productId]) {
                this.contents[productId].quantity += 1
            } else {
                this.contents[productId] = {
                    productId,
                    quantity: 1
                }
            }
        },
        remove(productId) {
            if (!this.contents[productId]) {
                // maybe add a message no product with that id on the cart or something
                return
            }

            this.contents[productId].quantity -= 1
            // maybe add a confirmation about to delete all the product of this kind ? 
            if (this.contents[productId].quantity == 0) {
                delete this.contents[productId]
            }
        },
        flush() {
            this.contents = []
        },
        async buy() {
            //moc api to buy all selected items
            return new Promise((res, rej) => {
                for (let item of this.formattedCart) {
                    setTimeout(() => {
                        console.info(`buying item: ${item}`)
                    }, 2000)
                }
                res()
            })
        }
    }
})