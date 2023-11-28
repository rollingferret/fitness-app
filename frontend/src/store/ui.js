
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalType) => ({
    type: OPEN_MODAL,
    payload: modalType
});

export const closeModal = () => ({
    type: CLOSE_MODAL 
});

const initialState = { 
    modal: false
};

const uiReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case OPEN_MODAL:
            newState.modal = action.payload;
            return newState;
        case CLOSE_MODAL:
            newState.modal = false;
            return newState;
        default:
            return state;
    }
};

export default uiReducer;