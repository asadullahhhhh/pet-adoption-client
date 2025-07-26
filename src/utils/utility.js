import axios from "axios"


export const imageUpload = async imageData => {
    const imageFormData = new FormData()
    imageFormData.append('image', imageData)

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=b456f10f1f403d14709adaeda6c781d7`,
      imageFormData
    );

    return data?.data?.url;
}

// Create User Info in DataBase
export const UserDB = async user => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/users`,
    user
  );

  return result
}

const localStorageGetItem = () => {
  const item = localStorage.getItem("cart");
  if (item) {
    const converted = JSON.parse(item);
    return converted;
  }
  return [];
};

const saveLocalStorage = (cart) => {
  const stringifyData = JSON.stringify(cart);
  localStorage.setItem("cart", stringifyData);
};

export { localStorageGetItem as getElement, saveLocalStorage as setElement };
