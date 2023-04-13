import axios from "axios";

const API_URL = "https://fakestoreapi.com";

class FakeStoreService {
  async getProducts(filters) {
    let res = await axios.get(`${API_URL}/products`, {
      filters,
    });
    return res?.data;
  }
}
export default new FakeStoreService();
