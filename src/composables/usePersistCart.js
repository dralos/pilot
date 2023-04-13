import { onUnmounted } from "vue";
import { useCartStore } from "../stores/cart.js";

export const CART_STORAGE = "CART_STORAGE";

export const usePersistCart = () => {
  const cartStore = useCartStore();

  // create an unsub method to save the cart to the local storage in case we leave
  // or something bad happens to the page
  // we might even want to save this data to the BE aswell
  // and then merge the data once the connection is back on
  const unsub = cartStore.$subscribe(() => {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cartStore.contents));
  });

  // trigger the unsub method when the page is being unmounted
  onUnmounted(() => {
    unsub();
  });
};
