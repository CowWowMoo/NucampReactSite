import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/campsites';
import { PARTNERS } from '../shared/campsites';
import { PROMOTIONS } from '../shared/campsites';

export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};