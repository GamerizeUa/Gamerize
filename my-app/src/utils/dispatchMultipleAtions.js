export const dispatchMultipleActions =
    (actions, params) => async (dispatch) => {
        const actionsToDispatch = actions.map((action, id) =>
            dispatch(action(params?.at(id)))
        );
        await Promise.all(actionsToDispatch);
    };
