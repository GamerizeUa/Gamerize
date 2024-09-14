import {createAppSlice} from "./createAppSlice";
import axios from "axios";

const initialState = {
    productsIdList: [],
    productsIdStatus: "no auth",
    productsStatus: "loading",
    statusOfWishing: "ready",
    productsList: [],
    pagesAmount: 0,
};

const wishListSlice = createAppSlice({
    name: "wishList",
    initialState,
    reducers: (create) => ({
        getWishListProductsIds: create.asyncThunk(
            async () => {
                const response = await axios.get("/api/WishList/OnlyProductId");
                return {
                    data: response.data.map(({productId}) => productId),
                };
            },
            {
                pending: (state) => {
                    state.statusOfWishing = "loading";
                    state.productsIdStatus = "loading";
                },
                fulfilled: (state, action) => {
                    state.statusOfWishing = "ready";
                    state.productsIdStatus = "synced";
                    state.productsIdList = action.payload.data;
                },
                rejected: (state) => {
                    state.statusOfWishing = "ready";
                    state.productsIdStatus = "failed";
                },
            }
        ),
        getWishListProducts: create.asyncThunk(
            async ({page, pageSize}) => {
                const response = await axios.get("/api/WishList/GetAllItemsFromWishList", {
                    params: {
                        page, pageSize,
                    },
                });
                console.log(response.data);
                return {
                    products: response.data.wishList.map(({product}) => product),
                    pagesAmount: response.data.totalPages,
                };
            },
            {
                pending: (state) => {
                    state.productsStatus = "loading";
                },
                fulfilled: (state, action) => {
                    state.productsStatus = "fulfilled";
                    state.productsList = action.payload.products;
                    state.pagesAmount = action.payload.pagesAmount;
                },
                rejected: (state) => {
                    state.productsStatus = "failed";
                },
            }
        ),
        logoutWishList: (state) => {
            state.productsIdList = [];
            state.productsList = [];
            state.productsIdStatus = "no auth";
        },
        removeAllFromWishList: create.asyncThunk(
            async (idList) => {
                console.log(idList);
                await axios.delete("/api/WishList/RemoveFromWishList", {data: idList})
                    .catch((e) => console.log(e));
            },
            {
                pending: (state) => {
                    state.statusOfWishing = "loading";
                },
                fulfilled: (state) => {
                    state.statusOfWishing = "ready";
                    state.productsIdList = [];
                    state.productsList = [];
                },
                rejected: (state) => {
                    state.statusOfWishing = "ready";
                },
            }
        ),
        addToWishList: create.asyncThunk(
            async (id) => {
                console.log(id);
                const response = await axios.post("/api/WishList/AddProductInWishList",
                    {"ProductId": id},
                    // {
                    //     ProductId: id,
                    // }
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                console.log(response.data);
                return {
                    id,
                };
            },
            {
                pending: (state) => {
                    state.statusOfWishing = "loading";
                },
                fulfilled: (state, action) => {
                    state.statusOfWishing = "ready";
                    state.productsIdList.push(action.payload.id);
                },
                rejected: (state) => {
                    state.statusOfWishing = "ready";
                },
            }
        ),
        removeOneFromWishList: create.asyncThunk(
            async (id) => {
                console.log(id)
                await axios.delete("/api/WishList/RemoveFromWishList", {
                    data: [id],
                }).catch((e) => console.log(e));
                return {
                    id,
                };
            },
            {
                pending: (state) => {
                    state.statusOfWishing = "loading";
                },
                fulfilled: (state, action) => {
                    console.warn("removed ", action.payload)
                    state.statusOfWishing = "ready";
                    state.productsIdList.splice(
                        state.productsIdList.findIndex((id) => id === action.payload.id),
                        1
                    );
                    console.log(state);
                },
                rejected: (state) => {
                    state.statusOfWishing = "ready";
                },
            }
        ),
    }),
});

export const wishListReducer = wishListSlice.reducer;
export const {
    addToWishList,
    removeOneFromWishList,
    removeAllFromWishList,
    logoutWishList,
    getWishListProductsIds,
    getWishListProducts,
} = wishListSlice.actions;
